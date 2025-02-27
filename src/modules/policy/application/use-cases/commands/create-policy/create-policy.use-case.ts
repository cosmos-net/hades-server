import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreatePolicyCommand } from '@policy/application/use-cases/commands/create-policy/create-policy.command';
import { POLICY_REPOSITORY } from '@policy/domain/constants/policy-injection-tokens.constants';
import { IPolicyRepositoryContract } from '@policy/domain/contracts/policy-repository.contract';
import { CreatePolicyDomainService } from '@policy/domain/domain-services/create-policy.domain-service';
import { PolicyModel } from '@policy/domain/models/policy.model';

@Injectable()
@CommandHandler(CreatePolicyCommand)
export class CreatePolicyUseCase implements ICommandHandler<CreatePolicyCommand, PolicyModel> {
  constructor(
    private readonly domainService: CreatePolicyDomainService,
    @Inject(POLICY_REPOSITORY)
    private readonly repository: IPolicyRepositoryContract,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreatePolicyCommand): Promise<PolicyModel> {
    const policyModel = this.publisher.mergeObjectContext(
      await this.domainService.createPolicy(command),
    );

    await this.repository.persist(policyModel);

    policyModel.commit();

    return policyModel;
  }
}
