import { Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateRoleCommand } from '@role/application/commands/use-cases/create-rol/create-rol.command';
import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { RoleModel } from '@role/domain/models/role.model';
import { CreateRoleDomainService } from '@role/domain/services/create-role.domain-service';

@Injectable()
@CommandHandler(CreateRoleCommand)
export class CreateRolUseCase implements ICommandHandler<CreateRoleCommand> {
  constructor(
    private readonly createRoleDomainService: CreateRoleDomainService,
    private readonly publisher: EventPublisher,
    private readonly repository: IRoleRepositoryContract,
  ) {}

  async execute(command: CreateRoleCommand): Promise<RoleModel> {
    const { uuid, name, description } = command;

    const roleModel = await this.createRoleDomainService.go(uuid, name, description);
    const role = this.publisher.mergeObjectContext(roleModel);

    await this.repository.persist(roleModel);

    role.commit();

    return role;
  }
}
