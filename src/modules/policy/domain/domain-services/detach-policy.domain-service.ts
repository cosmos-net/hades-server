import { IPolicyRepositoryContract } from '@policy/domain/contracts/policy-repository.contract';
import { PolicyNotFoundException } from '@policy/domain/exceptions/policy-not-found.exception';
import { PolicyModel } from '@policy/domain/models/policy.model';
import { IDetachPolicyParams } from '@policy/domain/schemas/policy.schema-primitives';

export class DetachPolicyDomainService {
  constructor(
    private readonly repository: IPolicyRepositoryContract,
    private policyModel: PolicyModel,
  ) {}

  async go(params: IDetachPolicyParams): Promise<PolicyModel> {
    const { roleUUID, permissionUUID } = params;

    await this.ensureExists(roleUUID, permissionUUID);

    this.policyModel.destroy();

    return this.policyModel;
  }

  private async ensureExists(roleUUID: string, permissionUUID: string): Promise<void> {
    const policyModel = await this.repository.getOneByCombination({
      roleUUID,
      permissionUUID,
      options: { withArchived: true },
    });

    if (!policyModel) {
      throw new PolicyNotFoundException(
        `Policy with role UUID ${roleUUID} and permission UUID ${permissionUUID} not found`,
      );
    }

    this.policyModel = policyModel;
  }
}
