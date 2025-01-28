import { AssignmentModel } from '@assignment/domain/models/assignment.model';

export class UpdateAssignmentOutputDto {
  public readonly uuid: string;
  public readonly roleUUID: string;
  public readonly description?: string;
  public readonly updatedAt: Date;

  constructor(root: AssignmentModel) {
    this.uuid = root.uuid;
    this.roleUUID = root.role.uuid;
    this.description = root.description;
    this.updatedAt = root.updatedAt;
  }
}
