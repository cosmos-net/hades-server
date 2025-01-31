import { IAssignmentRepositoryContract } from '@assignment/domain/contracts/assignment-repository.contract';
import { AssignmentNotFoundException } from '@assignment/domain/exceptions/assignment-not-found.exception';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';

export class ArchiveAssignmentsByRoleDomainService {
  private success: AssignmentModel[] | null = null;
  private failed: AssignmentModel[] | null = null;
  constructor(private readonly repository: IAssignmentRepositoryContract) {}

  async go(
    roleUUID: string,
  ): Promise<{ success: AssignmentModel[] | null; failed: AssignmentModel[] | null }> {
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
      this.success = [];
      this.failed = [];

      if (assignmentModel.archivedAt) {
        this.failed.push(assignmentModel);
      } else {
        this.success.push(assignmentModel);
        assignmentModel.archive();
      }
    });

    return {
      success: this.success,
      failed: this.failed,
    };
  }
}
