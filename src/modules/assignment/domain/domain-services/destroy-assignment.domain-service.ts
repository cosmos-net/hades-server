import { IAssignmentRepositoryContract } from '@assignment/domain/contracts/assignment-repository.contract';
import { AssignmentNotFoundException } from '@assignment/domain/exceptions/assignment-not-found.exception';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';

export class DestroyAssignmentDomainService {
  constructor(private readonly repository: IAssignmentRepositoryContract) {}

  async go(uuid: string): Promise<AssignmentModel> {
    const assignmentModel = await this.repository.getOneByUUID(uuid, {
      withArchived: true,
    });

    if (!assignmentModel) {
      throw new AssignmentNotFoundException(`Assignment with UUID ${uuid} not found`);
    }

    assignmentModel.destroy();

    return assignmentModel;
  }
}
