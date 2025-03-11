import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { DetachPolicyRoleCommand } from '@role/application/use-cases/commands/detach-policy-role/detach-policy-role.command';
import { ROLE_REPOSITORY } from '@role/domain/constants/injection-tokens';
import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { DetachPolicyRoleDomainService } from '@role/domain/domain-service/detach-policy-role.domain-service';
import { RoleModel } from '@role/domain/models/role.model';

@Injectable()
@CommandHandler(DetachPolicyRoleCommand)
export class DetachPolicyRoleUseCase implements ICommandHandler<DetachPolicyRoleCommand> {
  constructor(
    private readonly detachPolicyRoleDomainService: DetachPolicyRoleDomainService,
    private readonly publisher: EventPublisher,
    @Inject(ROLE_REPOSITORY)
    private readonly repository: IRoleRepositoryContract,
  ) {}

  async execute(command: DetachPolicyRoleCommand): Promise<RoleModel> {
    const { roleUUID, policyUUID } = command;

    const roleModel = await this.detachPolicyRoleDomainService.go(roleUUID, policyUUID);
    const roleContext = this.publisher.mergeObjectContext(roleModel);

    await this.repository.persist(roleModel);

    roleContext.commit();

    return roleContext;
  }
}
