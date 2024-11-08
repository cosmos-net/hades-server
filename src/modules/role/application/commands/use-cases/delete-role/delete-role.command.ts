import { ICommand } from '@nestjs/cqrs';

export class DeleteRoleCommand implements ICommand {
  public readonly uuid: string;

  constructor(root: DeleteRoleCommand) {
    this.uuid = root.uuid;
  }
}
