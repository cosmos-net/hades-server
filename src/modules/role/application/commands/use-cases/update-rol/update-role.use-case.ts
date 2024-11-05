import { Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { UpdateRoleCommand } from '@role/application/commands/use-cases/update-rol/update-role.command';
import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { RoleModel } from '@role/domain/models/role.model';
import { UpdateRoleDomainService } from '@role/domain/services/update-role.domain-service';

@Injectable()
@CommandHandler(UpdateRoleCommand)
export class UpdateRolUseCase implements ICommandHandler<UpdateRoleCommand> {
  constructor(
    private readonly UpdateRoleDomainService: UpdateRoleDomainService,
    private readonly publisher: EventPublisher,
    private readonly repository: IRoleRepositoryContract,
  ) {}

  async execute(command: UpdateRoleCommand): Promise<RoleModel> {
    const { name, description } = command;

    const roleModel = await this.UpdateRoleDomainService.go(name, description);
    const role = this.publisher.mergeObjectContext(roleModel);

    await this.repository.persist(roleModel);

    role.commit();

    return role;
  }
}
