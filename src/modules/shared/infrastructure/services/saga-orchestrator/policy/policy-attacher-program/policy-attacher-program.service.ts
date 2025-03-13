import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, ofType, Saga } from '@nestjs/cqrs';
import { Observable, from, EMPTY } from 'rxjs';
import { mergeMap, map, catchError, retry } from 'rxjs/operators';

import { AttachPolicyCommand } from '@policy/application/use-cases/commands/attach-policy/attach-policy.command';
import { DestroyPolicyCommand } from '@policy/application/use-cases/commands/destroy-policy/destroy-policy.command';
import { PolicyModel } from '@policy/domain/models/policy.model';
import { AttachPolicyRoleCommand } from '@role/application/use-cases/commands/attach-policy-role/attach-policy-role.command';
import { RoleModel } from '@role/domain/models/role.model';
import { PolicyAttacherProgramCommand } from '@shared/infrastructure/services/saga-orchestrator/policy/policy-attacher-program/policy-attacher-program.command';

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
export class PolicyAttacherProgramService {
  private readonly logger = new Logger(PolicyAttacherProgramService.name);
  private readonly retryAttempts = 3;

  constructor(private readonly commandBus: CommandBus) {}

  private buildSuccessResponse(
    policy: PolicyModel,
    roleResult: RoleModel,
  ): IPolicyProcessResponseDto {
    return {
      success: true,
      createdPolicy: { id: policy.id, uuid: policy.uuid },
      roleAttachResult: roleResult,
      message: 'Policy and role association completed successfully.',
    };
  }

  private buildErrorResponse(
    policy: PolicyModel,
    rollbackResult: unknown,
  ): IPolicyProcessResponseDto {
    return {
      success: false,
      createdPolicy: { id: policy.id, uuid: policy.uuid },
      rollbackResult,
      message: 'Error associating role to policy, rollback executed.',
    };
  }

  @Saga()
  policyAttacherProgramSaga = (
    events$: Observable<unknown>,
  ): Observable<IPolicyProcessResponseDto> => {
    return events$.pipe(
      ofType(PolicyAttacherProgramCommand),
      mergeMap((command: PolicyAttacherProgramCommand): Observable<IPolicyProcessResponseDto> => {
        return this.handlePolicyAttacherProgramCommand(command);
      }),
    );
  };

  /**
   * Orchestrates the saga process by creating the policy and then attempting to attach it to a role.
   * The attachPolicyToRole function now handles rollback in case of failure.
   *
   * @param command Command that triggers the process.
   * @returns Observable<IPolicyProcessResponseDto>
   */
  private handlePolicyAttacherProgramCommand(
    command: PolicyAttacherProgramCommand,
  ): Observable<IPolicyProcessResponseDto> {
    return this.createPolicy(command).pipe(
      mergeMap((policy: PolicyModel): Observable<IPolicyProcessResponseDto> => {
        return this.attachPolicyToRole(policy, command);
      }),
    );
  }

  /**
   * Creates a policy using the AttachPolicyCommand, handling retries and error logging.
   *
   * @param command Command containing the data to create the policy.
   * @returns Observable<PolicyModel>
   */
  private createPolicy(command: PolicyAttacherProgramCommand): Observable<PolicyModel> {
    return from(
      this.commandBus.execute<AttachPolicyCommand, PolicyModel>(
        new AttachPolicyCommand({
          uuid: command.uuid,
          roleUUID: command.roleUUID,
          permissionUUID: command.permissionUUID,
          description: command.description,
        }),
      ),
    ).pipe(
      retry(this.retryAttempts),
      catchError((error: Error): Observable<PolicyModel> => {
        this.logger.error(`Error creating policy with UUID: ${command.uuid}`, error);
        return EMPTY;
      }),
    );
  }

  /**
   * Attaches a policy to a role using the AttachPolicyRoleCommand.
   * This function handles its own retries, and in case of an error it executes the rollback,
   * returning a unified response (success or error).
   *
   * @param policy The policy to be attached.
   * @param command Command containing data for the attachment.
   * @returns Observable<IPolicyProcessResponseDto>
   */
  private attachPolicyToRole(
    policy: PolicyModel,
    command: PolicyAttacherProgramCommand,
  ): Observable<IPolicyProcessResponseDto> {
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
          `Error attaching policy (UUID: ${policy.uuid}) to role (UUID: ${command.roleUUID}).`,
          error,
        );
        // Trigger rollback in case of error
        return this.rollbackPolicy(policy).pipe(
          // The rollback's result is not used for further processing, we simply use it to build the error response.
          map((_rollbackResult: unknown): RoleModel => {
            // Here we choose to return an EMPTY RoleModel; the error response will be built below.
            return undefined;
          }),
        );
      }),
      mergeMap((roleResult: RoleModel): Observable<IPolicyProcessResponseDto> => {
        // If roleResult is undefined, it indicates that attach failed and rollback already executed.
        if (roleResult === undefined) {
          // In this case, we already logged error and executed rollback, so we build error response.
          return this.rollbackPolicy(policy).pipe(
            map(
              (rollbackResult: unknown): IPolicyProcessResponseDto =>
                this.buildErrorResponse(policy, rollbackResult),
            ),
          );
        }
        this.logger.log('Policy attached to role successfully.');
        this.logger.log(`Role attachment result: ${JSON.stringify(roleResult)}`);
        return from([this.buildSuccessResponse(policy, roleResult)]);
      }),
    );
  }

  /**
   * Executes a rollback by destroying the policy using the DestroyPolicyCommand,
   * handling its own retries and error logging.
   *
   * @param policy The policy for which the rollback is to be executed.
   * @returns Observable<unknown>
   */
  private rollbackPolicy(policy: PolicyModel): Observable<unknown> {
    return from(
      this.commandBus.execute<DestroyPolicyCommand, PolicyModel>(
        new DestroyPolicyCommand({
          policyId: policy.id,
        }),
      ),
    ).pipe(
      map((result: unknown): unknown => {
        this.logger.log('Rollback completed: Policy destroyed successfully.');
        this.logger.log(`Rollback result: ${JSON.stringify(result)}`);
        return result;
      }),
      catchError((rollbackError: Error): Observable<unknown> => {
        this.logger.error('Error during policy rollback', rollbackError);
        return EMPTY;
      }),
    );
  }
}
