import { ICommand } from '@nestjs/cqrs';

export class GetAccountQuery implements ICommand {
  public readonly uuid: string;
  public readonly withArchived: boolean;
  public readonly failIfArchived: boolean;
  public readonly includeSessions: boolean;

  constructor(root: GetAccountQuery) {
    this.uuid = root.uuid;
    this.withArchived = root.withArchived;
    this.failIfArchived = root.failIfArchived;
    this.includeSessions = root.includeSessions;
  }
}
