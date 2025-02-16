import { Injectable, Logger } from '@nestjs/common';
import { Saga, CommandBus, ofType, ICommand } from '@nestjs/cqrs';
import { from, Observable, of, throwError } from 'rxjs';
import { map, mergeMap, catchError, tap, delay, retry } from 'rxjs/operators';

import { PolicyCreationProgramCommand } from '@shared/infrastructure/services/saga-orchestrator/policy/policy-creation-program.command';

@Injectable()
export class PolicyCreationProgramService {
  private readonly logger = new Logger(PolicyCreationProgramService.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  public policyCreationProgram = (
    events$: Observable<CreatePolicySagaCommand>,
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(CreatePolicySagaCommand),
      mergeMap((event: CreatePolicySagaCommand): Observable<ICommand> => {
        return this.safeExecute(
          (evt: CreatePolicySagaCommand): Observable<{ id: string }> => this.createPolicy(evt),
          event,
        ).pipe(
          mergeMap(
            (policy: { id: string }): Observable<{ id: string }> =>
              this.safeExecute(
                (evt: CreatePolicySagaCommand): Observable<void> => this.assignPolicy(evt, policy),
                event,
              ).pipe(
                map((): { id: string } => policy), // Devuelve la política creada tras la asignación exitosa
              ),
          ),
          catchError((error): Observable<never> => this.handleCatchError(error, event)),
        );
      }),
    );
  };

  private handleCatchError(error: Error, event: PolicyCreationProgramCommand): Observable<never> {
    return this.safeExecute(this.rollbackPolicy.bind(this), event).pipe(
      tap((): void => this.logger.error('Rollback completed')),
      mergeMap((): Observable<never> => throwError((): Error => error)),
    );
  }

  /**
   * Método auxiliar para ejecutar operaciones de forma segura.
   * Captura y loguea errores, propagándolos para manejar rollback.
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
   * Retorna un observable que emite el objeto policy (se espera que contenga policy.id).
   */
  private createPolicy(event: CreatePolicySagaCommand): Observable<{ id: string }> {
    this.logger.log(`Creating policy for roleUUID: ${event.roleUUID}`);
    return from(
      this.commandBus.execute(
        new CreatePolicyCommand(event.roleUUID, event.permissionUUIDs, event.description),
      ),
    ).pipe(
      retry({
        delay: (error): Observable<unknown> => {
          this.logger.error('Error in createPolicy, retrying:', error.message);
          return of(error).pipe(delay(200));
        },
      }),
    );
  }

  /**
   * Ejecuta el comando para asignar la política al rol, utilizando el policy.id obtenido.
   */
  private assignPolicy(event: CreatePolicySagaCommand, policy: { id: string }): Observable<void> {
    this.logger.log(`Assigning policy ${policy.id} to role ${event.roleUUID}`);
    return from(
      this.commandBus.execute(
        new AssignPolicyToRoleCommand(event.roleUUID, policy.id, event.permissionUUIDs),
      ),
    );
  }

  /**
   * Ejecuta el comando de rollback para eliminar la política creada en caso de error.
   * Se asume que el RollbackPolicyCommand puede ser ejecutado con el policyId.
   */
  private rollbackPolicy(event: CreatePolicySagaCommand): Observable<void> {
    this.logger.warn(`Rolling back policy creation for roleUUID: ${event.roleUUID}`);
    // Nota: Si el comando original no contiene policyId, se debe ajustar para tenerlo
    // o utilizar otra estrategia de rollback. Aquí se asume que se utiliza roleUUID para revertir.
    return from(this.commandBus.execute(new RollbackPolicyCommand(event.roleUUID)));
  }
}

export class RollbackPolicyCommand {
  constructor(public readonly roleUUID: string) {}
}

export class AssignPolicyToRoleCommand {
  constructor(
    public readonly roleUUID: string,
    public readonly policyId: string,
    public readonly permissionUUIDs: string[],
  ) {}
}

export class CreatePolicyCommand {
  constructor(
    public readonly roleUUID: string,
    public readonly permissionUUIDs: string[],
    public readonly description: string,
  ) {}
}

export class CreatePolicySagaCommand {
  constructor(
    public readonly roleUUID: string,
    public readonly permissionUUIDs: string[],
    public readonly description: string,
  ) {}
}