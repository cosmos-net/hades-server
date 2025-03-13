import { ICommand } from '@nestjs/cqrs';

export class ArchivePolicyCommand implements ICommand {
  public readonly uuid: string;

  constructor(ArchivePolicyCommand) {
    this.uuid = ArchivePolicyCommand.uuid;
  }
}
