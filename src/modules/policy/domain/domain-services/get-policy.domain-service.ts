import { IPolicyRepositoryContract } from '@policy/domain/contracts/policy-repository.contract';
import { PolicyIsArchiveException } from '@policy/domain/exceptions/policy-is-archive.exception';
import { PolicyNotFoundException } from '@policy/domain/exceptions/policy-not-found.exception';
import { PolicyModel } from '@policy/domain/models/policy.model';

export class GetPolicyDomainService {
  constructor(private readonly policyRepository: IPolicyRepositoryContract) {}

  async go(uuid: string, withArchived: boolean, failIfArchived: boolean): Promise<PolicyModel> {
    const policyModel = await this.policyRepository.getOneByUUID(uuid, { withArchived });

    if (!policyModel) {
      throw new PolicyNotFoundException(`Policy ${uuid} not found`);
    }

    if (failIfArchived && policyModel.archivedAt) {
      throw new PolicyIsArchiveException(`Policy ${uuid} is archived`);
    }

    return policyModel;
  }
}
