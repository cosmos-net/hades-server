import { ICommand } from '@nestjs/cqrs';

export class GetUserQuery implements ICommand {
  public readonly uuid: string;

  constructor(root: GetUserQuery) {
    this.uuid = root.uuid;
  }
}
