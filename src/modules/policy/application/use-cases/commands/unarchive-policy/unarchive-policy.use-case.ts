import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { UnarchivePolicyCommand } from '@policy/application/use-cases/commands/unarchive-policy/unarchive-policy.command';
import { POLICY_REPOSITORY } from '@policy/domain/constants/policy-injection-tokens.constants';
import { IPolicyRepositoryContract } from '@policy/domain/contracts/policy-repository.contract';
import { UnarchivePolicyDomainService } from '@policy/domain/domain-services/unarchive-policy.domain-service';
import { PolicyModel } from '@policy/domain/models/policy.model';

@Injectable()
@CommandHandler(UnarchivePolicyCommand)
export class UnarchivePolicyUseCase
  implements ICommandHandler<UnarchivePolicyCommand, PolicyModel>
{
  constructor(
    private readonly domainService: UnarchivePolicyDomainService,
    @Inject(POLICY_REPOSITORY)
    private readonly repository: IPolicyRepositoryContract,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: UnarchivePolicyCommand): Promise<PolicyModel> {
    const policyModel = this.publisher.mergeObjectContext(
      await this.domainService.go(command.uuid),
    );

    await this.repository.persist(policyModel);

    policyModel.commit();

    return policyModel;
  }
}
