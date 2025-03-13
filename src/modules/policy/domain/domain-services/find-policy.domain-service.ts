import { IPolicyRepositoryContract } from '@policy/domain/contracts/policy-repository.contract';
import { PolicyIsArchiveException } from '@policy/domain/exceptions/policy-is-archive.exception';
import { PolicyNotFoundException } from '@policy/domain/exceptions/policy-not-found.exception';
import { PolicyModel } from '@policy/domain/models/policy.model';

export class FindPolicyDomainService {
  constructor(private readonly policyRepository: IPolicyRepositoryContract) {}

  async go(
    roleUUID: string,
    permissionUUID: string,
    withArchived: boolean,
    failIfArchived: boolean,
  ): Promise<PolicyModel> {
    const policyModel = await this.policyRepository.getOneByCombination({
      roleUUID,
      permissionUUID,
      options: {
        withArchived,
      },
    });

    if (!policyModel) {
      throw new PolicyNotFoundException(`Policy not found`);
    }

    if (failIfArchived && policyModel.archivedAt) {
      throw new PolicyIsArchiveException(`Policy found but is archived`);
    }

    return policyModel;
  }
}
