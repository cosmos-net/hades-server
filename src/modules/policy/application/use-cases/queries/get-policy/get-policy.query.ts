import { IQuery } from '@nestjs/cqrs';

export class GetPolicyQuery implements IQuery {
  public readonly uuid: string;
  public readonly withArchived?: boolean;
  public readonly failIfArchived?: boolean = false;

  constructor(props: GetPolicyQuery) {
    this.uuid = props.uuid;
    this.failIfArchived = props.failIfArchived;
    this.withArchived = props.failIfArchived || props.withArchived;
  }
}
