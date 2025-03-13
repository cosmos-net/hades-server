import { Criteria } from '@common/domain/criteria/criteria';
import { IPolicyRepositoryContract } from '@policy/domain/contracts/policy-repository.contract';
import { PolicyNotFoundException } from '@policy/domain/exceptions/policy-not-found.exception';
import { ListPolicyModel } from '@policy/domain/models/list-policy.model';

export class ListPolicyDomainService {
  constructor(private readonly policyRepository: IPolicyRepositoryContract) {}

  async go(criteria: Criteria): Promise<ListPolicyModel> {
    const policyList = await this.policyRepository.matching(criteria);

    if (policyList.getTotal === 0) {
      throw new PolicyNotFoundException('No policies found');
    }

    return policyList;
  }
}
