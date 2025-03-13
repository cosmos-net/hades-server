import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { AttachPolicyRoleCommand } from '@role/application/use-cases/commands/attach-policy-role/attach-policy-role.command';
import { ROLE_REPOSITORY } from '@role/domain/constants/injection-tokens';
import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { AttachPolicyRoleDomainService } from '@role/domain/domain-service/attach-policy-role.domain-service';
import { RoleModel } from '@role/domain/models/role.model';

@Injectable()
@CommandHandler(AttachPolicyRoleCommand)
export class AttachPolicyRoleUseCase implements ICommandHandler<AttachPolicyRoleCommand> {
  constructor(
    private readonly attachPolicyRoleDomainService: AttachPolicyRoleDomainService,
    private readonly publisher: EventPublisher,
    @Inject(ROLE_REPOSITORY)
    private readonly repository: IRoleRepositoryContract,
  ) {}

  async execute(command: AttachPolicyRoleCommand): Promise<RoleModel> {
    const { roleUUID, policyUUID } = command;

    const roleModel = await this.attachPolicyRoleDomainService.go(roleUUID, policyUUID);
    const roleContext = this.publisher.mergeObjectContext(roleModel);

    await this.repository.persist(roleModel);

    roleContext.commit();

    return roleContext;
  }
}
