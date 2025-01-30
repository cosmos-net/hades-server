import { IAssignmentRepositoryContract } from '@assignment/domain/contracts/assignment-repository.contract';
import { AssignmentNotFoundException } from '@assignment/domain/exceptions/assignment-not-found.exception';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';

export class GetAssignmentDomainService {
  constructor(private readonly assignmentRepository: IAssignmentRepositoryContract) {}

  async go(
    uuid: string,
    withArchived?: boolean,
    failIfArchived?: boolean,
  ): Promise<AssignmentModel> {
    const assignmentModel = await this.assignmentRepository.getOneByUUID(uuid, { withArchived });

    if (!assignmentModel) {
      throw new AssignmentNotFoundException(`Assignment with uuid ${uuid} not found`);
    }

    if (failIfArchived && assignmentModel.archivedAt) {
      throw new AssignmentNotFoundException(`Assignment with uuid ${uuid} is archived`);
    }

    return assignmentModel;
  }
}
