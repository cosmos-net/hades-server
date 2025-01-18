import { ICommand } from '@nestjs/cqrs';

export class GetUserQuery implements ICommand {
  public readonly uuid: string;
  public readonly withArchived: boolean;

  constructor(root: GetUserQuery) {
    this.uuid = root.uuid;
    this.withArchived = root.withArchived;
  }
}
