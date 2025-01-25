import { IAssignmentOrchestratorConsumerContract } from '@assignment/domain/contracts/assignment-orchestrator-consumer.contract';
import { IAssignmentRepositoryContract } from '@assignment/domain/contracts/assignment-repository.contract';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';

export class UserRoleAssignmentDomainService {
  constructor(
    private readonly repository: IAssignmentRepositoryContract,
    private readonly orchestrator: IAssignmentOrchestratorConsumerContract,
  ) {}

  async go(userUUID, roleUUID): Promise<AssignmentModel> {
    const userAggregate = await this.orchestrator.user.getByUUID({
      uuid: userUUID,
      withArchived: true,
      withProfile: false,
      withAccounts: false,
      failIfArchived: true,
    });

    const assignmentModel = await this.repository.getOneByUserUUID(userUUID, {
      withArchived: true,
    });

    if (assignmentModel) {
      throw new Error('User already has a role assigned');
    }
  }
}
