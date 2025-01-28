import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher } from '@nestjs/cqrs';

import { ArchiveAssignmentByUserCommand } from '@assignment/application/use-cases/commands/archive-assignment-by-user/archive-assignment-by-user.command';
import { ASSIGNMENT_REPOSITORY } from '@assignment/domain/constants/assignment-injection-tokens.constants';
import { IAssignmentRepositoryContract } from '@assignment/domain/contracts/assignment-repository.contract';
import { ArchiveAssignmentByUserDomainService } from '@assignment/domain/domain-services/archive-assignment-by-user.domain-service';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';

@Injectable()
@CommandHandler(ArchiveAssignmentByUserCommand)
export class ArchiveAssignmentByUserUseCase {
  constructor(
    private readonly archiveAssignmentByUserDomainService: ArchiveAssignmentByUserDomainService,
    private readonly publisher: EventPublisher,
    @Inject(ASSIGNMENT_REPOSITORY)
    private readonly repository: IAssignmentRepositoryContract,
  ) {}

  async execute(command: ArchiveAssignmentByUserCommand): Promise<AssignmentModel> {
    const { userUUID } = command;

    const assignmentModel = await this.archiveAssignmentByUserDomainService.go(userUUID);

    const assignmentContext = this.publisher.mergeObjectContext(assignmentModel);

    await this.repository.persist(assignmentModel);

    assignmentContext.commit();

    return assignmentContext;
  }
}
