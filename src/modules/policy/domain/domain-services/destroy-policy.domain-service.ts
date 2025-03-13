import { IPolicyRepositoryContract } from '@policy/domain/contracts/policy-repository.contract';
import { PolicyIsArchiveException } from '@policy/domain/exceptions/policy-is-archive.exception';
import { PolicyNotFoundException } from '@policy/domain/exceptions/policy-not-found.exception';
import { PolicyModel } from '@policy/domain/models/policy.model';

export class DestroyPolicyDomainService {
  constructor(
    private readonly repository: IPolicyRepositoryContract,
    private policyModel: PolicyModel,
  ) {}

  async go(uuid: string): Promise<PolicyModel> {
    await this.ensureExists(uuid);

    this.policyModel.destroy();

    return this.policyModel;
  }

  private async ensureExists(uuid: string): Promise<void> {
    this.policyModel = await this.repository.getOneByUUID(uuid);

    if (!this.policyModel) {
      throw new PolicyNotFoundException(`Policy with UUID ${uuid} not found`);
    }

    if (this.policyModel.archive) {
      throw new PolicyIsArchiveException(`Policy with UUID ${uuid} is already archived`);
    }
  }
}
