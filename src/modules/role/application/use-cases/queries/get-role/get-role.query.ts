import { IQuery } from '@nestjs/cqrs';

export class GetRoleQuery implements IQuery {
  public readonly uuid: string;
  public readonly withArchived?: boolean;
  public readonly failIfArchived?: boolean = false;

  constructor(root: GetRoleQuery) {
    this.uuid = root.uuid;
    this.failIfArchived = root.failIfArchived;
    this.withArchived = root.withArchived || root.failIfArchived;
  }
}
