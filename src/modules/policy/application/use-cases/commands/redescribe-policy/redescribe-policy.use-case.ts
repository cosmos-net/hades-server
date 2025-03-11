import { Injectable, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';

import { RedescribePolicyCommand } from '@policy/application/use-cases/commands/redescribe-policy/redescribe-policy.command';
import { POLICY_REPOSITORY } from '@policy/domain/constants/policy-injection-tokens.constants';
import { IPolicyRepositoryContract } from '@policy/domain/contracts/policy-repository.contract';
import { RedescribePolicyDomainService } from '@policy/domain/domain-services/redescribe-policy.domain-service';
import { PolicyModel } from '@policy/domain/models/policy.model';

@Injectable()
@CommandHandler(RedescribePolicyCommand)
export class RedescribePolicyUseCase
  implements ICommandHandler<RedescribePolicyCommand, PolicyModel>
{
  constructor(
    private readonly domainService: RedescribePolicyDomainService,
    @Inject(POLICY_REPOSITORY)
    private readonly repository: IPolicyRepositoryContract,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: RedescribePolicyCommand): Promise<PolicyModel> {
    const policyModel = this.publisher.mergeObjectContext(
      await this.domainService.go(command.uuid, command.description),
    );

    await this.repository.persist(policyModel);

    policyModel.commit();

    return policyModel;
  }
}
