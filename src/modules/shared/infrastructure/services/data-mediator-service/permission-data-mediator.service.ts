import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ListPermissionQuery } from '@permission/application/use-cases/queries/list-permission/list-permission.query';

@Injectable()
export class PermissionDataMediatorService {
  constructor(private readonly queryBus: QueryBus) {}

  async list(listPermissionQuery: ListPermissionQuery): Promise<void> {
    const result = await this.queryBus.execute<ListPermissionQuery, void>(
      new ListPermissionQuery(listPermissionQuery),
    );

    return result;
  }
}
