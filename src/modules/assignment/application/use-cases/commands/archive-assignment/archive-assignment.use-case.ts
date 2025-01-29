import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { ArchiveAssignmentCommand } from '@assignment/application/use-cases/commands/archive-assignment/archive-assignment.command';
import { ASSIGNMENT_REPOSITORY } from '@assignment/domain/constants/assignment-injection-tokens.constants';
import { IAssignmentRepositoryContract } from '@assignment/domain/contracts/assignment-repository.contract';
import { ArchiveAssignmentDomainService } from '@assignment/domain/domain-services/archive-assignment.domain-service';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';

@Injectable()
@CommandHandler(ArchiveAssignmentCommand)
export class ArchiveAssignmentUseCase implements ICommandHandler<ArchiveAssignmentCommand> {
  constructor(
    private readonly archiveAssignmentDomainService: ArchiveAssignmentDomainService,
    private readonly publisher: EventPublisher,
    @Inject(ASSIGNMENT_REPOSITORY)
    private readonly assignmentRepository: IAssignmentRepositoryContract,
  ) {}

  async execute(command: ArchiveAssignmentCommand): Promise<AssignmentModel> {
    const { uuid } = command;

    const assignmentModel = await this.archiveAssignmentDomainService.go(uuid);
    const assignmentContext = this.publisher.mergeObjectContext(assignmentModel);

    await this.assignmentRepository.persist(assignmentModel);

    assignmentContext.commit();

    return assignmentModel;
  }
}
