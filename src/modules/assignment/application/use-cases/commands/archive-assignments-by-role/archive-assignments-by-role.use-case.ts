import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher } from '@nestjs/cqrs';

import { ArchiveAssignmentsByRoleCommand } from '@assignment/application/use-cases/commands/archive-assignments-by-role/archive-assignments-by-role.command';
import { ASSIGNMENT_REPOSITORY } from '@assignment/domain/constants/assignment-injection-tokens.constants';
import { IAssignmentRepositoryContract } from '@assignment/domain/contracts/assignment-repository.contract';
import { ArchiveAssignmentsByRoleDomainService } from '@assignment/domain/domain-services/archive-assignments-by-role.domain-service';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';

@Injectable()
@CommandHandler(ArchiveAssignmentsByRoleCommand)
export class ArchiveAssignmentsByRoleUseCase {
  constructor(
    private readonly archiveAssignmentsByRoleDomainService: ArchiveAssignmentsByRoleDomainService,
    private readonly publisher: EventPublisher,
    @Inject(ASSIGNMENT_REPOSITORY)
    private readonly repository: IAssignmentRepositoryContract,
  ) {}

  async execute(
    command: ArchiveAssignmentsByRoleCommand,
  ): Promise<{ success: AssignmentModel[]; failed: AssignmentModel[] }> {
    const { roleUUID } = command;

    const { success, failed } = await this.archiveAssignmentsByRoleDomainService.go(roleUUID);

    for await (const assignmentModel of success) {
      const assignmentContext = this.publisher.mergeObjectContext(assignmentModel);

      await this.repository.persist(assignmentModel);

      assignmentContext.commit();
    }

    return { success, failed };
  }
}
