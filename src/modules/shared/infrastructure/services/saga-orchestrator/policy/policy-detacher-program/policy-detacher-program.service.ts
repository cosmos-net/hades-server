import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus, ofType, Saga } from '@nestjs/cqrs';
import { Observable, from, EMPTY, throwError } from 'rxjs';
import { mergeMap, map, catchError, retry } from 'rxjs/operators';

import { DetachPolicyCommand } from '@policy/application/use-cases/commands/detach-policy/detach-policy.command';
import { FindPolicyQuery } from '@policy/application/use-cases/queries/find-policy/find-policy.query';
import { PolicyModel } from '@policy/domain/models/policy.model';
import { AttachPolicyRoleCommand } from '@role/application/use-cases/commands/attach-policy-role/attach-policy-role.command';
import { DetachPolicyRoleCommand } from '@role/application/use-cases/commands/detach-policy-role/detach-policy-role.command';
import { RoleModel } from '@role/domain/models/role.model';
import { PolicyDetacherProgramCommand } from '@shared/infrastructure/services/saga-orchestrator/policy/policy-detacher-program/policy-detacher-program.command';

export interface IPolicyProcessResponseDto {
  success: boolean;
  createdPolicy: {
    id: number;
    uuid: string;
    // ...other relevant fields
  };
  roleAttachResult?: RoleModel;
  rollbackResult?: unknown;
  message: string;
}

@Injectable()
export class PolicyDetacherProgramService {
  private readonly logger = new Logger(PolicyDetacherProgramService.name);
  private readonly retryAttempts = 3;

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
   * Builds the success response DTO once the policy has been successfully destroyed
   * and the role detached.
   *
   * @param policy The PolicyModel that was processed.
   * @returns A unified success response DTO.
   */
  private buildSuccessResponse(policy: PolicyModel): IPolicyProcessResponseDto {
    return {
      success: true,
      createdPolicy: { id: policy.id, uuid: policy.uuid },
      message: 'Policy destruction and role detachment completed successfully.',
    };
  }

  /**
   * Builds the error response DTO when policy destruction fails and the rollback
   * (reattachment of the role) has been executed.
   *
   * @param policy The PolicyModel that was processed.
   * @param reattachResult The result of reattaching the policy to the role.
   * @returns A unified error response DTO.
   */
  private buildErrorResponse(
    policy: PolicyModel,
    reattachResult: RoleModel,
  ): IPolicyProcessResponseDto {
    return {
      success: false,
      createdPolicy: { id: policy.id, uuid: policy.uuid },
      roleAttachResult: reattachResult,
      message: 'Error destroying policy; role reattachment (rollback) executed.',
    };
  }

  /**
   * Saga that listens for PolicyDetacherProgramCommand events and initiates the detachment process.
   *
   * @param events$ Observable stream of events.
   * @returns An observable of unified response DTOs.
   */
  @Saga()
  policyDetacherProgramSaga = (
    events$: Observable<unknown>,
  ): Observable<IPolicyProcessResponseDto> => {
    return events$.pipe(
      ofType(PolicyDetacherProgramCommand),
      mergeMap((command: PolicyDetacherProgramCommand): Observable<IPolicyProcessResponseDto> => {
        return this.handleMainDelegatorProcess(command);
      }),
    );
  };

  /**
   * Initiates the detachment process by retrieving the PolicyModel using the FindPolicyQuery.
   *
   * @param command The PolicyDetacherProgramCommand containing the search criteria.
   * @returns An observable that emits the retrieved PolicyModel.
   */
  private handleRetrievePolicy(command: PolicyDetacherProgramCommand): Observable<PolicyModel> {
    return from(
      this.queryBus.execute<FindPolicyQuery, PolicyModel>(
        new FindPolicyQuery({
          roleUUID: command.roleUUID,
          permissionUUID: command.permissionUUID,
          failIfArchived: true,
        }),
      ),
    ).pipe(
      catchError((error: Error): Observable<PolicyModel> => {
        this.logger.error(
          `Policy not found for roleUUID: ${command.roleUUID} and permissionUUID: ${command.permissionUUID}`,
          error,
        );
        // Returns a unified error and stops the process if the policy is not found.
        return throwError((): Error => new Error('Policy not found'));
      }),
    );
  }

  /**
   * Delegator that starts the flow by retrieving the policy and then continuing with the detachment process.
   *
   * @param command The command that triggers the detachment process.
   * @returns An observable of unified response DTOs.
   */
  private handleMainDelegatorProcess(
    command: PolicyDetacherProgramCommand,
  ): Observable<IPolicyProcessResponseDto> {
    return this.handleRetrievePolicy(command).pipe(
      mergeMap(
        (policy: PolicyModel): Observable<IPolicyProcessResponseDto> =>
          this.handleMainOrchestratorProcess(policy, command),
      ),
    );
  }

  /**
   * Continues the detachment process from a retrieved PolicyModel:
   * 1. Detaches the policy from the role.
   * 2. Attempts to destroy the policy.
   * 3. On failure to destroy, initiates a rollback by reattaching the role.
   *
   * @param policy The retrieved PolicyModel.
   * @param command The detacher command.
   * @returns An observable of unified response DTOs.
   */
  private handleMainOrchestratorProcess(
    policy: PolicyModel,
    command: PolicyDetacherProgramCommand,
  ): Observable<IPolicyProcessResponseDto> {
    return this.handleDetachAssociation(policy, command).pipe(
      mergeMap(
        (): Observable<IPolicyProcessResponseDto> =>
          this.handleDestroyPolicy(policy, command).pipe(
            map((): IPolicyProcessResponseDto => this.buildSuccessResponse(policy)),
            catchError((destroyError: Error): Observable<IPolicyProcessResponseDto> => {
              this.logger.error(
                'Error destroying policy. Initiating rollback to reattach role.',
                destroyError,
              );
              return this.handleRollbackToReattachAssociation(policy, command).pipe(
                map(
                  (reattachResult: RoleModel): IPolicyProcessResponseDto =>
                    this.buildErrorResponse(policy, reattachResult),
                ),
              );
            }),
          ),
      ),
    );
  }

  /**
   * Detaches a policy from a role using the DetachPolicyRoleCommand.
   * If detachment fails, logs the error and stops the process.
   *
   * @param policy The PolicyModel to detach.
   * @param command The command containing the role information.
   * @returns An observable that completes when the association is detached.
   */
  private handleDetachAssociation(
    policy: PolicyModel,
    command: PolicyDetacherProgramCommand,
  ): Observable<void> {
    return from(
      this.commandBus.execute<DetachPolicyRoleCommand, RoleModel>(
        new DetachPolicyRoleCommand({
          policyUUID: policy.uuid,
          roleUUID: command.roleUUID,
        }),
      ),
    ).pipe(
      retry(this.retryAttempts),
      catchError((error: Error): Observable<unknown> => {
        this.logger.error(
          `Error detaching policy (UUID: ${policy.uuid}) from role (UUID: ${command.roleUUID}). Ignoring error.`,
          error,
        );
        // Throws a unified error to stop the process if desired.
        return throwError((): Error => new Error('Error on detach association'));
      }),
      map((): void => {
        return;
      }),
    );
  }

  /**
   * Destroys the policy using the DetachPolicyCommand.
   * This function handles its own retries and logging.
   *
   * @param policy The PolicyModel to be destroyed.
   * @param command The command containing the policy identification.
   * @returns An observable emitting the destroyed PolicyModel.
   */
  private handleDestroyPolicy(
    policy: PolicyModel,
    command: PolicyDetacherProgramCommand,
  ): Observable<PolicyModel> {
    return from(
      this.commandBus.execute<DetachPolicyCommand, PolicyModel>(
        new DetachPolicyCommand({
          roleUUID: command.roleUUID,
          permissionUUID: command.permissionUUID,
        }),
      ),
    ).pipe(
      retry(this.retryAttempts),
      catchError((error: Error): Observable<PolicyModel> => {
        this.logger.error(`Error destroying policy (ID: ${policy.id}).`, error);
        return EMPTY;
      }),
    );
  }

  /**
   * Reattaches a policy to a role using the AttachPolicyRoleCommand as a rollback mechanism.
   *
   * @param policy The PolicyModel to reattach.
   * @param command The command containing the role information.
   * @returns An observable emitting the RoleModel as a result of the reattachment.
   */
  private handleRollbackToReattachAssociation(
    policy: PolicyModel,
    command: PolicyDetacherProgramCommand,
  ): Observable<RoleModel> {
    return from(
      this.commandBus.execute<AttachPolicyRoleCommand, RoleModel>(
        new AttachPolicyRoleCommand({
          policyUUID: policy.uuid,
          roleUUID: command.roleUUID,
        }),
      ),
    ).pipe(
      retry(this.retryAttempts),
      catchError((error: Error): Observable<RoleModel> => {
        this.logger.error(
          `Error reattaching policy (UUID: ${policy.uuid}) to role (UUID: ${command.roleUUID}).`,
          error,
        );
        return EMPTY;
      }),
    );
  }
}
