import { IAssignmentRepositoryContract } from '@assignment/domain/contracts/assignment-repository.contract';
import { AssignmentNotFoundException } from '@assignment/domain/exceptions/assignment-not-found.exception';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';

export class ArchiveAssignmentsByRoleDomainService {
  constructor(private readonly repository: IAssignmentRepositoryContract) {}

  async go(roleUUID: string): Promise<{ success: AssignmentModel[]; failed: AssignmentModel[] }> {
    const success: AssignmentModel[] | null = null;
    const failed: AssignmentModel[] | null = null;

    const listAssignmentModels = await this.repository.listByRoleUUID(roleUUID, {
      withArchived: true,
      relations: {
        user: true,
        role: true,
      },
    });

    const total = listAssignmentModels.getTotal;
    const items = listAssignmentModels.getItemsModel;

    if (total === 0) {
      throw new AssignmentNotFoundException(`No assignments with role UUID ${roleUUID} found`);
    }

    items.forEach((assignmentModel): void => {
      if (assignmentModel.archivedAt) {
        failed.push(assignmentModel);
      } else {
        success.push(assignmentModel);
        assignmentModel.archive();
      }
    });

    return {
      success,
      failed,
    };
  }
}
