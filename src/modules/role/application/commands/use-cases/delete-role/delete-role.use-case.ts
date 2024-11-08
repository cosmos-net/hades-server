import { Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { DeleteRoleCommand } from '@role/application/commands/use-cases/delete-role/delete-role.command';
import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { RoleModel } from '@role/domain/models/role.model';
import { DeleteRoleDomainService } from '@role/domain/services/delete-role.domain-service';

@Injectable()
@CommandHandler(DeleteRoleCommand)
export class DeleteRoleUseCase implements ICommandHandler<DeleteRoleCommand> {
  constructor(
    private readonly deleteRoleDomainService: DeleteRoleDomainService,
    private readonly publisher: EventPublisher,
    private readonly repository: IRoleRepositoryContract,
  ) {}

  async execute(command: DeleteRoleCommand): Promise<RoleModel> {
    const { uuid } = command;

    const roleModel = await this.deleteRoleDomainService.go(uuid);
    const role = this.publisher.mergeObjectContext(roleModel);

    await this.repository.destroy(uuid);

    role.commit();

    return role;
  }
}
