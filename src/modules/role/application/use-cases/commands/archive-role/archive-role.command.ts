import { ICommand } from '@nestjs/cqrs';

export class ArchiveRoleCommand implements ICommand {
  public readonly uuid: string;

  constructor(root: ArchiveRoleCommand) {
    this.uuid = root.uuid;
  }
}
