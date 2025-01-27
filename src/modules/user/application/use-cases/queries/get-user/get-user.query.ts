import { ICommand } from '@nestjs/cqrs';

export class GetUserQuery implements ICommand {
  public readonly uuid: string;
  public readonly withArchived: boolean;
  public readonly failIfArchived?: boolean = false;

  constructor(root: GetUserQuery) {
    this.uuid = root.uuid;
    this.withArchived = root.withArchived;
    this.failIfArchived = root.failIfArchived;
  }
}
