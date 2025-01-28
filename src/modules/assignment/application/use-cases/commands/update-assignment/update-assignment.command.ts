import { ICommand } from '@nestjs/cqrs';

export class UpdateAssignmentCommand implements ICommand {
  public readonly uuid: string;
  public readonly roleUUID?: string;
  public readonly description?: string;

  constructor(root: UpdateAssignmentCommand) {
    this.uuid = root.uuid;

    if (root.roleUUID) {
      this.roleUUID = root.roleUUID;
    }

    if (root.description) {
      this.description = root.description;
    }
  }
}
