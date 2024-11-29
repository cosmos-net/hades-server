import { ICommand } from '@nestjs/cqrs';

export class DestroyUserCommand implements ICommand {
  public readonly uuid: string;

  constructor(root: DestroyUserCommand) {
    this.uuid = root.uuid;
  }
}
