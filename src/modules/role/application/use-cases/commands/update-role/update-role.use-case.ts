import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { UpdateRoleCommand } from '@role/application/use-cases/commands/update-role/update-role.command';
import { ROLE_REPOSITORY } from '@role/domain/constants/injection-tokens';
import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { UpdateRoleDomainService } from '@role/domain/domain-service/update-role.domain-service';
import { RoleModel } from '@role/domain/models/role.model';

@Injectable()
@CommandHandler(UpdateRoleCommand)
export class UpdateRoleUseCase implements ICommandHandler<UpdateRoleCommand> {
  constructor(
    private readonly UpdateRoleDomainService: UpdateRoleDomainService,
    private readonly publisher: EventPublisher,
    @Inject(ROLE_REPOSITORY)
    private readonly repository: IRoleRepositoryContract,
  ) {}

  async execute(command: UpdateRoleCommand): Promise<RoleModel> {
    const { uuid, name, description } = command;

    const roleModel = await this.UpdateRoleDomainService.go(uuid, name, description);
    const role = this.publisher.mergeObjectContext(roleModel);

    await this.repository.persist(roleModel);

    role.commit();

    return role;
  }
}
