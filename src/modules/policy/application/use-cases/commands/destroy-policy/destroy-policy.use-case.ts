import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { DestroyPolicyCommand } from '@policy/application/use-cases/commands/destroy-policy/destroy-policy.command';
import { POLICY_REPOSITORY } from '@policy/domain/constants/policy-injection-tokens.constants';
import { IPolicyRepositoryContract } from '@policy/domain/contracts/policy-repository.contract';
import { DestroyPolicyDomainService } from '@policy/domain/domain-services/destroy-policy.domain-service';
import { PolicyModel } from '@policy/domain/models/policy.model';

@Injectable()
@CommandHandler(DestroyPolicyCommand)
export class DestroyPolicyUseCase implements ICommandHandler<DestroyPolicyCommand> {
  constructor(
    private readonly destroyPolicyDomainService: DestroyPolicyDomainService,
    private readonly publisher: EventPublisher,
    @Inject(POLICY_REPOSITORY)
    private readonly policyRepository: IPolicyRepositoryContract,
  ) {}

  async execute(command: DestroyPolicyCommand): Promise<PolicyModel> {
    const { uuid } = command;

    const policyModel = await this.destroyPolicyDomainService.go(uuid);
    const policyContext = this.publisher.mergeObjectContext(policyModel);

    await this.policyRepository.destroy(policyModel.uuid);

    policyContext.commit();

    return policyModel;
  }
}
