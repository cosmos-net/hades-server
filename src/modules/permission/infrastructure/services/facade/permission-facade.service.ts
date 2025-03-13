import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetPermissionQuery } from '@permission/application/use-cases/queries/get-permission/get-permission.query';
import { ListPermissionQuery } from '@permission/application/use-cases/queries/list-permission/list-permission.query';
import { ListPermissionModel } from '@permission/domain/models/permission-list.model';
import { PermissionModel } from '@permission/domain/models/permission.model';

@Injectable()
export class PermissionFacadeService {
  constructor(private readonly queryBus: QueryBus) {}

  async get(query: GetPermissionQuery): Promise<PermissionModel> {
    const result = await this.queryBus.execute<GetPermissionQuery, PermissionModel>(
      new GetPermissionQuery(query),
    );

    return result;
  }

  async list(query: ListPermissionQuery): Promise<ListPermissionModel> {
    const result = await this.queryBus.execute<ListPermissionQuery, ListPermissionModel>(
      new ListPermissionQuery(query),
    );

    return result;
  }
}
