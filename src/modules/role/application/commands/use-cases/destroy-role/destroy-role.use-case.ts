import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { DestroyRoleCommand } from '@role/application/commands/use-cases/destroy-role/destroy-role.command';
import { ROLE_REPOSITORY } from '@role/domain/constants/injection-tokens';
import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { RoleModel } from '@role/domain/models/role.model';
import { DestroyRoleDomainService } from '@role/domain/domain-service/destroy-role.domain-service';

@Injectable()
@CommandHandler(DestroyRoleCommand)
export class DestroyRoleUseCase implements ICommandHandler<DestroyRoleCommand> {
  constructor(
    private readonly destroyRoleDomainService: DestroyRoleDomainService,
    private readonly publisher: EventPublisher,
    @Inject(ROLE_REPOSITORY)
    private readonly repository: IRoleRepositoryContract,
  ) {}

  async execute(command: DestroyRoleCommand): Promise<RoleModel> {
    const { uuid } = command;

    const roleModel = await this.destroyRoleDomainService.go(uuid);
    const role = this.publisher.mergeObjectContext(roleModel);

    await this.repository.destroy(uuid);

    role.commit();

    return role;
  }
}
