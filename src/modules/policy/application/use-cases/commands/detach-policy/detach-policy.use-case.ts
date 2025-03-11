import { Injectable, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';

import { DetachPolicyCommand } from '@policy/application/use-cases/commands/detach-policy/detach-policy.command';
import { POLICY_REPOSITORY } from '@policy/domain/constants/policy-injection-tokens.constants';
import { IPolicyRepositoryContract } from '@policy/domain/contracts/policy-repository.contract';
import { DetachPolicyDomainService } from '@policy/domain/domain-services/detach-policy.domain-service';
import { PolicyModel } from '@policy/domain/models/policy.model';

@Injectable()
@CommandHandler(DetachPolicyCommand)
export class DetachPolicyUseCase implements ICommandHandler<DetachPolicyCommand, PolicyModel> {
  constructor(
    private readonly domainService: DetachPolicyDomainService,
    @Inject(POLICY_REPOSITORY)
    private readonly repository: IPolicyRepositoryContract,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DetachPolicyCommand): Promise<PolicyModel> {
    const policyModel = this.publisher.mergeObjectContext(await this.domainService.go(command));

    await this.repository.persist(policyModel);

    policyModel.commit();

    return policyModel;
  }
}
