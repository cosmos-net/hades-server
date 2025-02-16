import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetRoleQuery } from '@role/application/use-cases/queries/get-role/get-role.query';
import { RoleModel } from '@role/domain/models/role.model';

@Injectable()
export class RoleDataMediatorService {
  constructor(private readonly queryBus: QueryBus) {}

  async getByUUID(getRoleQuery: GetRoleQuery): Promise<RoleModel> {
    const result = await this.queryBus.execute<GetRoleQuery, RoleModel>(
      new GetRoleQuery(getRoleQuery),
    );

    return result;
  }
}
