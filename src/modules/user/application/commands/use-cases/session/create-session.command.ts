import { ICommand } from '@nestjs/cqrs';

export class CreateSessionCommand implements ICommand {
  public readonly uuid: string;
  public readonly token: string;

  constructor(root: CreateSessionCommand) {
    this.uuid = root.uuid;
    this.token = root.token;
  }
}
