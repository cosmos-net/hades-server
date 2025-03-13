import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { RoleAlreadyArchivedException } from '@role/domain/exceptions/role-already-archived.exception';
import { RoleNotFoundException } from '@role/domain/exceptions/role-not-found.exception';
import { RoleModel } from '@role/domain/models/role.model';
import { DataMediatorService } from '@shared/infrastructure/services/data-mediator-service/data-mediator.service';

export class DetachPolicyRoleDomainService {
  constructor(
    private readonly repository: IRoleRepositoryContract,
    private readonly mediator: DataMediatorService,
    private roleModel: RoleModel,
  ) {}

  async go(roleUUID: string, policyUUID: string): Promise<RoleModel> {
    await this.ensureRoleExists(roleUUID);
    const policyModel = await this.mediator.policy.get({ uuid: policyUUID, failIfArchived: true });

    this.roleModel.detachPolicy(policyModel);

    return this.roleModel;
  }

  private async ensureRoleExists(roleUUID: string): Promise<void> {
    const roleModel = await this.repository.getOneBy(roleUUID);

    if (!roleModel) {
      throw new RoleNotFoundException(`Role with UUID ${roleUUID} not found`);
    }

    if (roleModel.archivedAt) {
      throw new RoleAlreadyArchivedException(
        `Role with UUID ${roleModel.uuid} is already archived with date ${roleModel.archivedAt}`,
      );
    }

    this.roleModel = roleModel;
  }
}
