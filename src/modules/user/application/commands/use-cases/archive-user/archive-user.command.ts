import { ICommand } from '@nestjs/cqrs';

export class ArchiveUserCommand implements ICommand {
  public readonly uuid: string;

  constructor(root: ArchiveUserCommand) {
    this.uuid = root.uuid;
  }
}
