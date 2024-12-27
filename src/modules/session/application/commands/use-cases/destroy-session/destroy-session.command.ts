import { ICommand } from '@nestjs/cqrs';

export class DestroySessionCommand implements ICommand {
  public readonly uuid: string;

  constructor(root: DestroySessionCommand) {
    this.uuid = root.uuid;
  }
}
