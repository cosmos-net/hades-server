import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher } from '@nestjs/cqrs';

import { UserRoleAssignmentCommand } from '@assignment/application/use-cases/commands/user-role-assignment.command';
import { ASSIGNMENT_REPOSITORY } from '@assignment/domain/constants/assignment-injection-tokens.constants';
import { IAssignmentRepositoryContract } from '@assignment/domain/contracts/assignment-repository.contract';
import { UserRoleAssignmentDomainService } from '@assignment/domain/domain-services/user-role-assignment.domain-service';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';

@Injectable()
@CommandHandler(UserRoleAssignmentCommand)
export class UserRoleAssignmentUseCase {
  constructor(
    private readonly userRoleAssignmentDomainService: UserRoleAssignmentDomainService,
    private readonly publisher: EventPublisher,
    @Inject(ASSIGNMENT_REPOSITORY)
    private readonly repository: IAssignmentRepositoryContract,
  ) {}

  async execute(command: UserRoleAssignmentCommand): Promise<AssignmentModel> {
    const { uuid, userUUID, roleUUID, description } = command;

    const assignmentModel = await this.userRoleAssignmentDomainService.go(
      uuid,
      userUUID,
      roleUUID,
      description,
    );

    const assignmentContext = this.publisher.mergeObjectContext(assignmentModel);

    await this.repository.persist(assignmentModel);

    assignmentContext.commit();

    return assignmentContext;
  }
}
