import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher } from '@nestjs/cqrs';

import { UpdateAssignmentCommand } from '@assignment/application/use-cases/commands/update-assignment/update-assignment.command';
import { ASSIGNMENT_REPOSITORY } from '@assignment/domain/constants/assignment-injection-tokens.constants';
import { IAssignmentRepositoryContract } from '@assignment/domain/contracts/assignment-repository.contract';
import { UpdateAssignmentDomainService } from '@assignment/domain/domain-services/update-assignment.domain-service';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';

@Injectable()
@CommandHandler(UpdateAssignmentCommand)
export class UpdateAssignmentUseCase {
  constructor(
    private readonly updateAssignmentDomainService: UpdateAssignmentDomainService,
    private readonly publisher: EventPublisher,
    @Inject(ASSIGNMENT_REPOSITORY)
    private readonly repository: IAssignmentRepositoryContract,
  ) {}

  async execute(command: UpdateAssignmentCommand): Promise<AssignmentModel> {
    const { uuid, roleUUID, description } = command;

    const assignmentModel = await this.updateAssignmentDomainService.go(
      uuid,
      roleUUID,
      description,
    );

    const assignmentContext = this.publisher.mergeObjectContext(assignmentModel);

    await this.repository.persist(assignmentModel);

    assignmentContext.commit();

    return assignmentContext;
  }
}
