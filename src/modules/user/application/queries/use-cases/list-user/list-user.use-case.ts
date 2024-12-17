import { Injectable } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';

import { Criteria } from '@common/domain/criteria/criteria';
import { ListUserQuery } from '@user/application//queries/use-cases/list-user/list-user.query';
import { ListUserAggregate } from '@user/domain/aggregates/list-user.aggregate';
import { ListUserDomainService } from '@user/domain/domain-services/list-user.domain-service';

@Injectable()
export class ListUserUseCase implements IQueryHandler<ListUserQuery, ListUserAggregate> {
  constructor(private readonly listUserDomainService: ListUserDomainService) {}

  async execute(query: ListUserQuery): Promise<ListUserAggregate> {
    const { orderType, orderBy, limit, offset, filtersMap } = query;

    const criteria = new Criteria(filtersMap, orderBy, orderType, limit, offset);

    const listUserAggregate = this.listUserDomainService.go(criteria);

    return listUserAggregate;
  }
}
