import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Criteria } from '@common/domain/criteria/criteria';
import { ListPermissionQuery } from '@permission/application/use-cases/queries/list-permission/list-permission.query';
import { ListPermissionDomainService } from '@permission/domain/domain-services/list-permission.domain-service';
import { ListPermissionModel } from '@permission/domain/models/permission-list.model';

@Injectable()
@QueryHandler(ListPermissionQuery)
export class ListPermissionUseCase
  implements IQueryHandler<ListPermissionQuery, ListPermissionModel>
{
  constructor(private readonly listPermissionDomainService: ListPermissionDomainService) {}

  async execute(query: ListPermissionQuery): Promise<ListPermissionModel> {
    const { orderType, orderBy, limit, offset, withArchived, filtersMap } = query;

    const criteria = new Criteria(filtersMap, orderBy, orderType, limit, offset, withArchived);

    const permissions = await this.listPermissionDomainService.go(criteria);

    return permissions;
  }
}
