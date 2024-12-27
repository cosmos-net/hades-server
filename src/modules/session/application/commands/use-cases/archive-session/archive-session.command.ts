import { ICommand } from '@nestjs/cqrs';

export class ArchiveSessionCommand implements ICommand {
  public readonly uuid: string;

  constructor(root: ArchiveSessionCommand) {
    this.uuid = root.uuid;
  }
}
