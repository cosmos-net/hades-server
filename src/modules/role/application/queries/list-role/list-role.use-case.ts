import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Criteria } from '@common/domain/criteria/criteria';
import { ListRoleQuery } from '@role/application/queries/list-role/list-role.query';
import { ListRoleModel } from '@role/domain/models/role-list.model';
import { ListRoleDomainService } from '@role/domain/domain-service/list-role.domain-service';

@Injectable()
@QueryHandler(ListRoleQuery)
export class ListRoleUseCase implements IQueryHandler<ListRoleQuery, ListRoleModel> {
  constructor(private readonly listRoleDomainService: ListRoleDomainService) {}

  async execute(query: ListRoleQuery): Promise<ListRoleModel> {
    const { orderType, orderBy, limit, offset, filtersMap } = query;

    const criteria = new Criteria(filtersMap, orderBy, orderType, limit, offset);

    const roles = await this.listRoleDomainService.go(criteria);

    return roles;
  }
}
