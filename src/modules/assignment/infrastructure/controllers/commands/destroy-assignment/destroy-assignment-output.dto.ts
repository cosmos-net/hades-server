import { AssignmentModel } from '@assignment/domain/models/assignment.model';

export class DestroyAssignmentOutputDto {
  public readonly message: string;

  constructor(root: AssignmentModel) {
    this.message = `Assignment with UUID ${root.uuid} has been destroyed`;
  }
}
