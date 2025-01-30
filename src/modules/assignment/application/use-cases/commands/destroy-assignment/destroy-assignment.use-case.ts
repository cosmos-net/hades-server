import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { DestroyAssignmentCommand } from '@assignment/application/use-cases/commands/destroy-assignment/destroy-assignment.command';
import { ASSIGNMENT_REPOSITORY } from '@assignment/domain/constants/assignment-injection-tokens.constants';
import { IAssignmentRepositoryContract } from '@assignment/domain/contracts/assignment-repository.contract';
import { DestroyAssignmentDomainService } from '@assignment/domain/domain-services/destroy-assignment.domain-service';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';

@Injectable()
@CommandHandler(DestroyAssignmentCommand)
export class DestroyAssignmentUseCase implements ICommandHandler<DestroyAssignmentCommand> {
  constructor(
    private readonly destroyAssignmentDomainService: DestroyAssignmentDomainService,
    private readonly publisher: EventPublisher,
    @Inject(ASSIGNMENT_REPOSITORY)
    private readonly assignmentRepository: IAssignmentRepositoryContract,
  ) {}

  async execute(command: DestroyAssignmentCommand): Promise<AssignmentModel> {
    const { uuid } = command;

    const assignmentModel = await this.destroyAssignmentDomainService.go(uuid);
    const assignmentContext = this.publisher.mergeObjectContext(assignmentModel);

    await this.assignmentRepository.destroy(uuid);

    assignmentContext.commit();

    return assignmentModel;
  }
}
