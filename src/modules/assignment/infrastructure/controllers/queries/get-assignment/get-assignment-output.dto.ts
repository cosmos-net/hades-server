import { AssignmentModel } from '@assignment/domain/models/assignment.model';

export class GetAssignmentOutputDto {
  public readonly id?: number;
  public readonly uuid: string;
  public readonly title: string;
  public readonly description: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly archivedAt?: Date;

  constructor(root: AssignmentModel) {
    this.id = root.id;
    this.uuid = root.uuid;
    this.title = root.title;
    this.description = root.description;
    this.createdAt = root.createdAt;
    this.updatedAt = root.updatedAt;
    this.archivedAt = root.archivedAt;
  }
}
