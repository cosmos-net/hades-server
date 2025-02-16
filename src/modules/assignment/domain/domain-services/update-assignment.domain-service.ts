import { IAssignmentDataMediatorContract } from '@assignment/domain/contracts/assignment-data-mediator.contract';
import { IAssignmentRepositoryContract } from '@assignment/domain/contracts/assignment-repository.contract';
import { AssignmentNotFoundException } from '@assignment/domain/exceptions/assignment-not-found.exception';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';

export class UpdateAssignmentDomainService {
  constructor(
    private readonly repository: IAssignmentRepositoryContract,
    private readonly dataMediatorService: IAssignmentDataMediatorContract,
  ) {}

  async go(uuid: string, roleUUID?: string, description?: string): Promise<AssignmentModel> {
    const assignmentModel = await this.repository.getOneByUUID(uuid, {
      withArchived: true,
      relations: {
        user: true,
        role: true,
      },
    });

    if (!assignmentModel) {
      throw new AssignmentNotFoundException(`Assignment with UUID ${uuid} not found`);
    }

    if (assignmentModel.archivedAt) {
      throw new AssignmentNotFoundException(`Assignment with UUID ${uuid} is archived`);
    }

    if (roleUUID) {
      const roleModel = await this.dataMediatorService.role.getByUUID({
        uuid: roleUUID,
        withArchived: true,
        failIfArchived: true,
      });

      assignmentModel.reAssignRole(roleModel);
    }

    if (description) {
      assignmentModel.redescribe({ description });
    }

    return assignmentModel;
  }
}
