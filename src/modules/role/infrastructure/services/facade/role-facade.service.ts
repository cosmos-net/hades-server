import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetRoleQuery } from '@role/application/use-cases/queries/get-role/get-role.query';
import { ListRoleQuery } from '@role/application/use-cases/queries/list-role/list-role.query';
import { ListRoleModel } from '@role/domain/models/role-list.model';
import { RoleModel } from '@role/domain/models/role.model';

@Injectable()
export class RoleFacadeService {
  constructor(private readonly queryBus: QueryBus) {}

  async get(query: GetRoleQuery): Promise<RoleModel> {
    const result = await this.queryBus.execute<GetRoleQuery, RoleModel>(new GetRoleQuery(query));

    return result;
  }

  async list(query: ListRoleQuery): Promise<ListRoleModel> {
    const result = await this.queryBus.execute<ListRoleQuery, ListRoleModel>(
      new ListRoleQuery(query),
    );

    return result;
  }
}
