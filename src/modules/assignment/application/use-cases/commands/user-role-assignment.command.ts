import { ICommand } from '@nestjs/cqrs';

export class UserRoleAssignmentCommand implements ICommand {
  public readonly uuid: string;
  public readonly userUUID: string;
  public readonly roleUUID: string;
  public readonly description: string;

  constructor(root: UserRoleAssignmentCommand) {
    this.uuid = root.uuid;
    this.userUUID = root.userUUID;
    this.roleUUID = root.roleUUID;
    this.description = root.description;
  }
}
