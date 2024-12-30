import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateRoleCommand } from '@role/application/commands/use-cases/create-role/create-role.command';
import { ROLE_REPOSITORY } from '@role/domain/constants/injection-tokens';
import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { CreateRoleDomainService } from '@role/domain/domain-service/create-role.domain-service';
import { RoleModel } from '@role/domain/models/role.model';

@Injectable()
@CommandHandler(CreateRoleCommand)
export class CreateRoleUseCase implements ICommandHandler<CreateRoleCommand> {
  constructor(
    private readonly createRoleDomainService: CreateRoleDomainService,
    private readonly publisher: EventPublisher,
    @Inject(ROLE_REPOSITORY)
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
