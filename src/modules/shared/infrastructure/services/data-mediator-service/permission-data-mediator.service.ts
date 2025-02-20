import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ListPermissionQuery } from '@permission/application/use-cases/queries/list-permission/list-permission.query';
import { ListPermissionModel } from '@permission/domain/models/permission-list.model';

@Injectable()
export class PermissionDataMediatorService {
  constructor(private readonly queryBus: QueryBus) {}

  async list(listPermissionQuery: ListPermissionQuery): Promise<ListPermissionModel> {
    const result = await this.queryBus.execute<ListPermissionQuery, ListPermissionModel>(
      new ListPermissionQuery(listPermissionQuery),
    );

    return result;
  }
}
