import { IAssignmentRepositoryContract } from '@assignment/domain/contracts/assignment-repository.contract';
import { AssignmentNotFoundException } from '@assignment/domain/exceptions/assignment-not-found.exception';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';

export class ArchiveAssignmentByUserDomainService {
  constructor(private readonly repository: IAssignmentRepositoryContract) {}

  async go(userUUID: string): Promise<AssignmentModel> {
    const assignmentModel = await this.repository.getOneByUserUUID(userUUID, {
      withArchived: true,
      relations: {
        user: true,
        role: true,
      },
    });

    if (!assignmentModel) {
      throw new AssignmentNotFoundException(`Assignment with user UUID ${userUUID} not found`);
    }

    if (assignmentModel.archivedAt) {
      throw new AssignmentNotFoundException(`Assignment with user UUID ${userUUID} is archived`);
    }

    assignmentModel.archive();

    return assignmentModel;
  }
}
