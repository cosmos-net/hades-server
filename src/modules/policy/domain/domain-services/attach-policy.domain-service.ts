import { IPolicyRepositoryContract } from '@policy/domain/contracts/policy-repository.contract';
import { PolicyIsArchiveException } from '@policy/domain/exceptions/policy-is-archive.exception';
import { PolicyNotFoundException } from '@policy/domain/exceptions/policy-not-found.exception';
import { PolicyModel } from '@policy/domain/models/policy.model';
import { IAttachPolicyParams } from '@policy/domain/schemas/policy.schema-primitives';
import { IDataMediatorServiceContract } from '@shared/domain/contracts/data-mediator-service.contract';

export class AttachPolicyDomainService {
  constructor(
    private readonly repository: IPolicyRepositoryContract,
    private readonly dataMediatorService: IDataMediatorServiceContract,
  ) {}

  async go(params: IAttachPolicyParams): Promise<PolicyModel> {
    const { uuid, roleUUID, permissionUUID, description } = params;

    this.ensureIsAvailable(roleUUID, permissionUUID);

    const roleModel = await this.dataMediatorService.role.get({
      uuid: roleUUID,
      failIfArchived: true,
    });

    const permissionModel = await this.dataMediatorService.permission.get({
      uuid: permissionUUID,
      failIfArchived: true,
    });

    const policyModel = PolicyModel.create({
      uuid,
      description,
      role: roleModel,
      permission: permissionModel,
    });

    return policyModel;
  }

  private async ensureIsAvailable(roleUUID: string, permissionUUID: string): Promise<void> {
    const policyModel = await this.repository.getOneByCombination({
      roleUUID,
      permissionUUID,
      options: { withArchived: true },
    });

    if (policyModel) {
      const isArchived = policyModel.archive;
      const message = `Policy with role UUID ${roleUUID} and permission UUID ${permissionUUID} already exists and is ${
        isArchived ? 'archived' : 'active'
      }`;

      const issue = isArchived
        ? new PolicyIsArchiveException(message)
        : new PolicyNotFoundException(message);

      throw issue;
    }
  }
}
