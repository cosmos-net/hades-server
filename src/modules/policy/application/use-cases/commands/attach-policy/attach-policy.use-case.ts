import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { AttachPolicyCommand } from '@policy/application/use-cases/commands/attach-policy/attach-policy.command';
import { POLICY_REPOSITORY } from '@policy/domain/constants/policy-injection-tokens.constants';
import { IPolicyRepositoryContract } from '@policy/domain/contracts/policy-repository.contract';
import { AttachPolicyDomainService } from '@policy/domain/domain-services/attach-policy.domain-service';
import { PolicyModel } from '@policy/domain/models/policy.model';

@Injectable()
@CommandHandler(AttachPolicyCommand)
export class AttachPolicyUseCase implements ICommandHandler<AttachPolicyCommand, PolicyModel> {
  constructor(
    private readonly domainService: AttachPolicyDomainService,
    @Inject(POLICY_REPOSITORY)
    private readonly repository: IPolicyRepositoryContract,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: AttachPolicyCommand): Promise<PolicyModel> {
    const policyModel = this.publisher.mergeObjectContext(await this.domainService.go(command));

    await this.repository.persist(policyModel);

    policyModel.commit();

    return policyModel;
  }
}
