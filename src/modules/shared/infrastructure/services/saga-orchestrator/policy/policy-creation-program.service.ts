import { Injectable, Logger } from '@nestjs/common';
import { Saga, CommandBus, ofType, ICommand } from '@nestjs/cqrs';
import { Observable, from, throwError } from 'rxjs';
import { mergeMap, catchError, map, delay, tap, retry } from 'rxjs/operators';

// Comandos y tipos importados
import { PolicyCreationProgramCommand } from '@shared/infrastructure/services/saga-orchestrator/policy/policy-creation-program.command';

/**
 * Service que orquesta el flujo de creación de políticas utilizando las Sagas de NestJS CQRS.
 * Se encarga de:
 *   1. Ejecutar el flujo de creación de la política.
 *   2. Asignar la política al rol.
 *   3. Ejecutar rollback en caso de error.
 */
@Injectable()
export class PolicyCreationProgramService {
  private readonly logger = new Logger(PolicyCreationProgramService.name);

  constructor(private readonly commandBus: CommandBus) {}

  /**
   * Saga que orquesta la creación de la política y su asignación.
   * Se activa al recibir un PolicyCreationProgramCommand.
   *
   * Flujo:
   *  1. Crear la política.
   *  2. Asignar la política al rol.
   *  3. En caso de error, ejecutar rollback.
   *
   * @param events$ Observable que emite comandos de tipo PolicyCreationProgramCommand.
   * @returns Observable que emite el comando final (o error en caso de fallo).
   */
  @Saga()
  public policyCreationSaga = (
    events$: Observable<PolicyCreationProgramCommand>,
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(PolicyCreationProgramCommand),
      mergeMap(
        (command: PolicyCreationProgramCommand): Observable<ICommand> =>
          this.handlePolicyCreation(command),
      ),
    );
  };

  /**
   * Orquesta la creación y asignación de la política.
   * @param command Datos para la creación de la política.
   * @returns Observable que emite el objeto policy (contiene policy.id) o lanza error.
   */
  private handlePolicyCreation(command: PolicyCreationProgramCommand): Observable<ICommand> {
    return this.safeExecute(this.createPolicy, command).pipe(
      mergeMap(
        (policy: { id: string }): Observable<ICommand> =>
          this.handlePolicyAssignment(command, policy),
      ),
      catchError(
        (error): Observable<never> => this.handlePolicyCreationErrorAndRollback(command, error),
      ),
    );
  }

  /**
   * Encapsula la operación de asignación de la política al rol.
   *
   * @param command Datos originales.
   * @param policy Objeto policy creado.
   * @returns Observable que emite la política creada al finalizar la asignación.
   */
  private handlePolicyAssignment(
    command: PolicyCreationProgramCommand,
    policy: { id: string },
  ): Observable<ICommand> {
    return this.safeExecute(
      (cmd): Observable<void> => this.assignPolicy(cmd, policy),
      command,
    ).pipe(map((): { id: string } => policy));
  }

  /**
   * Maneja errores durante el flujo y ejecuta el rollback.
   * En caso de error en la creación de la política, se ejecuta rollback.
   * @param command Datos de entrada originales.
   * @param error Error ocurrido durante el proceso.
   * @returns Observable que lanza el error tras intentar el rollback.
   */
  private handlePolicyCreationErrorAndRollback(
    command: PolicyCreationProgramCommand,
    error: Error,
  ): Observable<never> {
    return this.safeExecute(this.rollbackPolicy, command).pipe(
      mergeMap((): Observable<never> => throwError((): Error => error)),
    );
  }

  /**
   * Método auxiliar para ejecutar una operación de forma segura.
   * Captura, loguea y re-lanza errores.
   *
   * @param operation Función que recibe un evento y retorna un Observable.
   * @param event Evento o datos de entrada.
   * @returns Observable del resultado de la operación o error formateado.
   */
  private safeExecute<T, K>(operation: (event: K) => Observable<T>, event: K): Observable<T> {
    return operation(event).pipe(
      catchError((error): Observable<never> => {
        const eventInfo = JSON.stringify(event);
        const errorMsg = `Error processing event: ${eventInfo} - ${error.message}`;
        this.logger.error(errorMsg, error.stack);
        return throwError((): Error => new Error(errorMsg));
      }),
    );
  }

  /**
   * Ejecuta el comando para crear la política.
   * Convierte la ejecución del comando en un Observable para poder encadenarlo.
   *
   * @param command PolicyCreationProgramCommand con los datos necesarios.
   * @returns Observable que emite el objeto policy (se espera que contenga policy.id).
   */
  private createPolicy(command: PolicyCreationProgramCommand): Observable<{ id: string }> {
    this.logger.log(`Creating policy for roleUUID: ${command.roleUUID}`);
    return from(
      this.commandBus.execute(
        new CreatePolicyCommand(command.roleUUID, command.permissionUUIDs, command.description),
      ),
    ).pipe(
      // Reintentar en caso de error con delay
      retry({
        delay: (error: Observable<unknown>): Observable<unknown> =>
          error.pipe(
            tap((err: unknown): void => {
              const errorInstance = err as Error;
              this.logger.error('Error in createPolicy, retrying:', errorInstance.message);
            }),
            delay(200),
          ),
      }),
    );
  }

  /**
   * Ejecuta el comando para asignar la política al rol.
   * Requiere el objeto policy creado para obtener el policy.id.
   *
   * @param command Datos originales.
   * @param policy Objeto policy creado, se espera que contenga el ID.
   * @returns Observable que emite void.
   */
  private assignPolicy(
    command: PolicyCreationProgramCommand,
    policy: { id: string },
  ): Observable<void> {
    this.logger.log(`Assigning policy ${policy.id} to role ${command.roleUUID}`);
    return from(
      this.commandBus.execute(
        new AssignPolicyToRoleCommand(command.roleUUID, policy.id, command.permissionUUIDs),
      ),
    );
  }

  /**
   * Ejecuta el comando de rollback para eliminar la política creada en caso de error.
   * Se invoca en caso de que falle alguno de los pasos previos en el flujo.
   *
   * @param command PolicyCreationProgramCommand con los datos iniciales.
   * @returns Observable que emite void.
   */
  private rollbackPolicy(command: PolicyCreationProgramCommand): Observable<void> {
    this.logger.warn(`Rolling back policy creation for roleUUID: ${command.roleUUID}`);
    return from(this.commandBus.execute(new RollbackPolicyCommand(command.roleUUID)));
  }
}

// =====================
// Definición de Comandos
// =====================

/**
 * Comando para iniciar el proceso de creación de política y su asignación.
 */
export class CreatePolicySagaCommand {
  constructor(
    public readonly roleUUID: string,
    public readonly permissionUUIDs: string[],
    public readonly description?: string,
  ) {}
}

/**
 * Comando que crea la política.
 */
export class CreatePolicyCommand {
  constructor(
    public readonly roleUUID: string,
    public readonly permissionUUIDs: string[],
    public readonly description?: string,
  ) {}
}

/**
 * Comando para asignar la política al rol.
 */
export class AssignPolicyToRoleCommand {
  constructor(
    public readonly roleUUID: string,
    public readonly policyId: string,
    public readonly permissionUUIDs: string[],
  ) {}
}

/**
 * Comando para ejecutar rollback en caso de error durante el proceso.
 */
export class RollbackPolicyCommand {
  constructor(public readonly roleUUID: string) {}
}
