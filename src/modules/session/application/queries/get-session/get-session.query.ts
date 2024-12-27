import { IQuery } from '@nestjs/cqrs';

export class GetSessionQuery implements IQuery {
  public readonly uuid: string;

  public readonly withArchived?: boolean;

  constructor(root: GetSessionQuery) {
    this.uuid = root.uuid;
    this.withArchived = root.withArchived;
  }
}
