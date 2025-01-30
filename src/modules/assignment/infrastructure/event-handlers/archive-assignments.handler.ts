import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ArchiveAssignmentByUserCommand } from '@assignment/application/use-cases/commands/archive-assignment-by-user/archive-assignment-by-user.command';
import { ArchiveAssignmentsByRoleCommand } from '@assignment/application/use-cases/commands/archive-assignments-by-role/archive-assignments-by-role.command';
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

        const result = await this.commandBus.execute(
          new ArchiveAssignmentByUserCommand({
            userUUID: userModel.uuid,
          }),
        );

        this.logger.log(`Archived ${result.length} assignments for user: ${userModel.uuid}`);
      },
    );

    this.mediatorStoreService.subscribe<RoleModel>(
      'role.archived',
      async (roleModel): Promise<void> => {
        this.logger.log(`Archiving assignments for role: ${roleModel.uuid}`);

        const result = await this.commandBus.execute(
          new ArchiveAssignmentsByRoleCommand({
            roleUUID: roleModel.uuid,
          }),
        );

        this.logger.log(`Archived ${result.length} assignments for role: ${roleModel.uuid}`);
      },
    );
  }
}
