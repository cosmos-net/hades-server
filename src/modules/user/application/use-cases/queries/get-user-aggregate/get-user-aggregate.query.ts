import { ICommand } from '@nestjs/cqrs';

export class GetUserAggregateQuery implements ICommand {
  public readonly uuid: string;
  public readonly withArchived: boolean;
  public readonly failIfArchived?: boolean = false;

  constructor(root: GetUserAggregateQuery) {
    this.uuid = root.uuid;
    this.withArchived = root.withArchived;
    this.failIfArchived = root.failIfArchived;
  }
}
