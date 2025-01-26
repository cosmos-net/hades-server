import { IQuery } from '@nestjs/cqrs';

export class GetRoleQuery implements IQuery {
  public readonly uuid: string;
  public readonly withArchived?: boolean;
  public readonly failIfArchived?: boolean = false;

  constructor(root: GetRoleQuery) {
    this.uuid = root.uuid;
    this.withArchived = root.withArchived;
    this.failIfArchived = root.failIfArchived;
  }
}
