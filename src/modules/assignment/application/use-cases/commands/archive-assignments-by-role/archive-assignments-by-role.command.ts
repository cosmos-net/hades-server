import { ICommand } from '@nestjs/cqrs';

export class ArchiveAssignmentsByRoleCommand implements ICommand {
  public readonly roleUUID: string;

  constructor(root: ArchiveAssignmentsByRoleCommand) {
    this.roleUUID = root.roleUUID;
  }
}
