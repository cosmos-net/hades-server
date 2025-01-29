import { AssignmentModel } from '@assignment/domain/models/assignment.model';

export class ArchiveAssignmentOutputDto {
  public readonly uuid: string;
  public readonly archivedAt: Date;

  constructor(root: AssignmentModel) {
    this.uuid = root.uuid;
    this.archivedAt = root.archivedAt;
  }
}
