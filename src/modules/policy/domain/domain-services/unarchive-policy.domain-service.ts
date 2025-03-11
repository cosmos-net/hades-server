import { IPolicyRepositoryContract } from '@policy/domain/contracts/policy-repository.contract';
import { PolicyNotFoundException } from '@policy/domain/exceptions/policy-not-found.exception';
import { PolicyModel } from '@policy/domain/models/policy.model';

export class UnarchivePolicyDomainService {
  constructor(private readonly repository: IPolicyRepositoryContract) {}

  async go(uuid: string): Promise<PolicyModel> {
    const policyModel = await this.repository.getOneByUUID(uuid, {
      withArchived: true,
    });

    if (!policyModel) {
      throw new PolicyNotFoundException(`Policy with UUID ${uuid} not found`);
    }

    policyModel.unarchive();

    return policyModel;
  }
}
