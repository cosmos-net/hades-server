import { Injectable } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';

import { Criteria } from '@common/domain/criteria/criteria';
import { ListRoleQuery } from '@role/application/queries/list-role/list-role.query';
import { ListRoleModel } from '@role/domain/models/role-list.model';
import { ListRoleDomainService } from '@role/domain/services/list-role.domain-service';

@Injectable()
export class ListRoleUseCase implements IQueryHandler<ListRoleQuery, ListRoleModel> {
  constructor(private readonly listRoleDomainService: ListRoleDomainService) {}

  async execute(query: ListRoleQuery): Promise<ListRoleModel> {
    const { orderType, orderBy, limit, offset, filtersMap } = query;

    const criteria = new Criteria(filtersMap, orderBy, orderType, limit, offset);

    const roles = await this.listRoleDomainService.go(criteria);

    return roles;
  }
}
