import { IQuery } from '@nestjs/cqrs';

export class GetRoleQuery implements IQuery {
  public readonly uuid: string;

  constructor(root: GetRoleQuery) {
    this.uuid = root.uuid;
  }
}
