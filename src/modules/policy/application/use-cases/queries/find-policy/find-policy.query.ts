import { IQuery } from '@nestjs/cqrs';

export class FindPolicyQuery implements IQuery {
  public readonly roleUUID: string;
  public readonly permissionUUID: string;
  public readonly withArchived?: boolean;
  public readonly failIfArchived?: boolean = false;

  constructor(props: FindPolicyQuery) {
    this.roleUUID = props.roleUUID;
    this.permissionUUID = props.permissionUUID;
    this.failIfArchived = props.failIfArchived;
    this.withArchived = props.failIfArchived || props.withArchived;
  }
}
