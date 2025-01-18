import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Criteria } from '@common/domain/criteria/criteria';
import { ListUserQuery } from '@user/application/use-cases/queries/list-user/list-user.query';
import { ListUserAggregate } from '@user/domain/aggregates/list-user.aggregate';
import { ListUserDomainService } from '@user/domain/domain-services/list-user.domain-service';

@Injectable()
@QueryHandler(ListUserQuery)
export class ListUserUseCase implements IQueryHandler<ListUserQuery, ListUserAggregate> {
  constructor(private readonly listUserDomainService: ListUserDomainService) {}

  async execute(query: ListUserQuery): Promise<ListUserAggregate> {
    const { orderType, orderBy, limit, offset, filtersMap, withArchived } = query;

    const criteria = new Criteria(filtersMap, orderBy, orderType, limit, offset, withArchived);

    const listUserAggregate = this.listUserDomainService.go(criteria);

    return listUserAggregate;
  }
}
