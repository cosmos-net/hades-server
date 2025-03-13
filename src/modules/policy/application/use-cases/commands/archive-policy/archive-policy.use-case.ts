import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { ArchivePolicyCommand } from '@policy/application/use-cases/commands/archive-policy/archive-policy.command';
import { POLICY_REPOSITORY } from '@policy/domain/constants/policy-injection-tokens.constants';
import { IPolicyRepositoryContract } from '@policy/domain/contracts/policy-repository.contract';
import { ArchivePolicyDomainService } from '@policy/domain/domain-services/archive-policy.domain-service';
import { PolicyModel } from '@policy/domain/models/policy.model';

@Injectable()
@CommandHandler(ArchivePolicyCommand)
export class ArchivePolicyUseCase implements ICommandHandler<ArchivePolicyCommand> {
  constructor(
    private readonly archivePolicyDomainService: ArchivePolicyDomainService,
    private readonly publisher: EventPublisher,
    @Inject(POLICY_REPOSITORY)
    private readonly policyRepository: IPolicyRepositoryContract,
  ) {}

  async execute(command: ArchivePolicyCommand): Promise<PolicyModel> {
    const { uuid } = command;

    const policyModel = await this.archivePolicyDomainService.go(uuid);
    const policyContext = this.publisher.mergeObjectContext(policyModel);

    await this.policyRepository.persist(policyModel);

    policyContext.commit();

    return policyModel;
  }
}
