import { ICommand } from '@nestjs/cqrs';

export class ArchiveAssignmentCommand implements ICommand {
  public readonly uuid: string;

  constructor(ArchiveAssignmentCommand) {
    this.uuid = ArchiveAssignmentCommand.uuid;
  }
}
