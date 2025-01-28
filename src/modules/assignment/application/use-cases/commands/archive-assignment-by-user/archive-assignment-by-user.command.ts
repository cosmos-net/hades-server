import { ICommand } from '@nestjs/cqrs';

export class ArchiveAssignmentByUserCommand implements ICommand {
  public readonly userUUID: string;

  constructor(root: ArchiveAssignmentByUserCommand) {
    this.userUUID = root.userUUID;
  }
}
