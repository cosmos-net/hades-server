import { Injectable } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';

import { Criteria } from '@common/domain/criteria/criteria';
import { ListRoleQuery } from '@role/application/queries/list-role/list-role.query';
import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { ListRoleModel } from '@role/domain/models/role-list.model';

@Injectable()
export class ListRoleUseCase implements IQueryHandler<ListRoleQuery, ListRoleModel> {
  constructor(private readonly roleRepository: IRoleRepositoryContract) {}

  async execute(query: ListRoleQuery): Promise<ListRoleModel> {
    const { orderType, orderBy, limit, offset, filtersMap } = query;

    const criteria = new Criteria(filtersMap, orderBy, orderType, limit, offset);

    const roles = await this.roleRepository.matching(criteria);

    return roles;
  }
}
