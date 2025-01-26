import { AssignmentModel } from '@assignment/domain/models/assignment.model';

export class UserRoleAssignmentOutputDto {
  public readonly uuid: string;
  public readonly userUUID: string;
  public readonly roleUUID: string;
  public readonly description: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(root: AssignmentModel) {
    this.uuid = root.uuid;
    this.userUUID = root.user.uuid;
    this.roleUUID = root.role.uuid;
    this.description = root.description;
    this.createdAt = root.createdAt;
    this.updatedAt = root.updatedAt;
  }
}
