import { ICommand } from '@nestjs/cqrs';

export class GetRoleQuery implements ICommand {
  public readonly uuid: string;

  constructor(root: GetRoleQuery) {
    this.uuid = root.uuid;
  }
}
