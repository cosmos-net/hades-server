import { ICommand } from '@nestjs/cqrs';

export class UpdateRoleCommand implements ICommand {
  public readonly name: string;
  public readonly description: string;

  constructor(root: UpdateRoleCommand) {
    this.name = root.name;
    this.description = root.description;
  }
}
