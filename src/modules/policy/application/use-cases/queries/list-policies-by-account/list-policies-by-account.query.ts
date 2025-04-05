import { IQuery } from '@nestjs/cqrs';

export class ListPoliciesByAccountQuery implements IQuery {
  public readonly accountUUID: string;
  public readonly withArchived?: boolean;

  constructor(props: ListPoliciesByAccountQuery) {
    this.accountUUID = props.accountUUID;
    this.withArchived = props.withArchived || false;
  }
}