import { IAssignmentOrchestratorConsumerContract } from '@assignment/domain/contracts/assignment-orchestrator-consumer.contract';
import { IAssignmentRepositoryContract } from '@assignment/domain/contracts/assignment-repository.contract';
import { AssignmentAlreadyExistException } from '@assignment/domain/exceptions/assignment-already-exist.exception';
import { UserAlreadyHasAnAssignmentException } from '@assignment/domain/exceptions/user-already-has-an-assignment.exception';
import { AssignmentModel } from '@assignment/domain/models/assignment.model';

export class UserRoleAssignmentDomainService {
  constructor(
    private readonly repository: IAssignmentRepositoryContract,
    private readonly orchestrator: IAssignmentOrchestratorConsumerContract,
  ) {}

  async go(
    uuid: string,
    userUUID: string,
    roleUUID: string,
    description: string,
  ): Promise<AssignmentModel> {
    const userModel = await this.orchestrator.user.getByUUID({
      uuid: userUUID,
      withArchived: true,
      failIfArchived: true,
    });

    const roleModel = await this.orchestrator.role.getByUUID({
      uuid: roleUUID,
      withArchived: true,
      failIfArchived: true,
    });

    const assignmentModelFound = await this.repository.getOneByUserUUID(userModel.uuid, {
      withArchived: true,
    });

    const isSameRole = assignmentModelFound?.role.uuid === roleModel.uuid;

    if (isSameRole) {
      throw new AssignmentAlreadyExistException(
        `User ${assignmentModelFound.user.uuid} already has an assignment with role ${assignmentModelFound.role.uuid}`,
      );
    }

    if (assignmentModelFound) {
      const isArchived = assignmentModelFound.archivedAt !== null;

      throw new UserAlreadyHasAnAssignmentException(
        `User ${assignmentModelFound.user.uuid} already has an ${isArchived ? 'archived' : 'active'} assignment with role ${assignmentModelFound.role.uuid}`,
      );
    }

    const assignmentModel = AssignmentModel.fromPrimitives({
      uuid,
      user: userModel,
      role: roleModel,
      description,
    });

    assignmentModel.create();

    return assignmentModel;
  }
}
