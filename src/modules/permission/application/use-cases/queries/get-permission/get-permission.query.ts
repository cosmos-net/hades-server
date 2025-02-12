import { IQuery } from '@nestjs/cqrs';

export class GetPermissionQuery implements IQuery {
  public readonly uuid: string;
  public readonly withArchived?: boolean;
  public readonly failIfArchived?: boolean = false;

  constructor(root: GetPermissionQuery) {
    this.uuid = root.uuid;
    this.withArchived = root.withArchived;
    this.failIfArchived = root.failIfArchived;
  }
}
