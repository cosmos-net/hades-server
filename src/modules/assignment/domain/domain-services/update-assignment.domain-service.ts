import { IAssignmentOrchestratorConsumerContract } from '@assignment/domain/contracts/assignment-orchestrator-consumer.contract';
import { IAssignmentRepositoryContract } from '@assignment/domain/contracts/assignment-repository.contract';
import { AssignmentNotFoundException } from '@assignment/domain/exceptions/assignment-not-found.exception';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';

export class UpdateAssignmentDomainService {
  constructor(
    private readonly repository: IAssignmentRepositoryContract,
    private readonly orchestrator: IAssignmentOrchestratorConsumerContract,
  ) {}

  async go(uuid: string, roleUUID?: string, description?: string): Promise<AssignmentModel> {
    const assignmentModel = await this.repository.getOneByUUID(uuid, { withArchived: true });

    if (!assignmentModel) {
      throw new AssignmentNotFoundException(`Assignment with UUID ${uuid} not found`);
    }

    if (assignmentModel.archive) {
      throw new AssignmentNotFoundException(`Assignment with UUID ${uuid} is archived`);
    }

    if (roleUUID) {
      const roleModel = await this.orchestrator.role.getByUUID({
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
