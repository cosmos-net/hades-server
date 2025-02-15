import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ArchiveAssignmentByUserCommand } from '@assignment/application/use-cases/commands/archive-assignment-by-user/archive-assignment-by-user.command';
import { ArchiveAssignmentsByRoleCommand } from '@assignment/application/use-cases/commands/archive-assignments-by-role/archive-assignments-by-role.command';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';
import { MediatorStoreService } from '@common/infrastructure/services/mediator-store-service/mediator-store.service';
import { RoleModel } from '@role/domain/models/role.model';
import { UserModel } from '@user/domain/models/user/user.model';

@Injectable()
export class ArchiveAssignmentsHandler implements OnModuleInit {
  private readonly logger = new Logger(ArchiveAssignmentsHandler.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly mediatorStoreService: MediatorStoreService,
  ) {}

  onModuleInit(): void {
    this.mediatorStoreService.subscribe<UserModel>(
      'user.archived',
      async (userModel): Promise<void> => {
        this.logger.log(`Archiving assignments for user: ${userModel.uuid}`);

        const result = await this.commandBus.execute<
          ArchiveAssignmentByUserCommand,
          AssignmentModel
        >(
          new ArchiveAssignmentByUserCommand({
            userUUID: userModel.uuid,
          }),
        );

        this.logger.log(
          `Successfully archived assignment ${result.uuid} for user: ${userModel.uuid}`,
        );
      },
    );

    this.mediatorStoreService.subscribe<RoleModel>(
      'role.archived',
      async (roleModel): Promise<void> => {
        this.logger.log(`Archiving assignments for role: ${roleModel.uuid}`);

        const result = await this.commandBus.execute<
          ArchiveAssignmentsByRoleCommand,
          { success: AssignmentModel[] | null; failed: AssignmentModel[] | null }
        >(
          new ArchiveAssignmentsByRoleCommand({
            roleUUID: roleModel.uuid,
          }),
        );

        this.logger.log(
          `Successfully archived ${result.success.length} assignments for role: ${roleModel.uuid}`,
        );

        this.logger.log(
          `Failed to archive ${result.failed.length} assignments for role: ${roleModel.uuid}`,
        );
      },
    );
  }
}
