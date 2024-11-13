import { ICommand } from '@nestjs/cqrs';

export class DestroyRoleCommand implements ICommand {
  public readonly uuid: string;

  constructor(root: DestroyRoleCommand) {
    this.uuid = root.uuid;
  }
}
