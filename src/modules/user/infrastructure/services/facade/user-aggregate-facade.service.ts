import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetUserAggregateQuery } from '@user/application/use-cases/queries/get-user-aggregate/get-user-aggregate.query';
import { ListUserQuery } from '@user/application/use-cases/queries/list-user/list-user.query';
import { ListUserAggregate } from '@user/domain/aggregates/list-user.aggregate';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';

@Injectable()
export class UserAggregateFacadeService {
  constructor(private readonly queryBus: QueryBus) {}

  async get(query: GetUserAggregateQuery): Promise<UserAggregate> {
    const result = await this.queryBus.execute<GetUserAggregateQuery, UserAggregate>(
      new GetUserAggregateQuery(query),
    );

    return result;
  }

  async list(query: ListUserQuery): Promise<ListUserAggregate> {
    const result = await this.queryBus.execute<ListUserQuery, ListUserAggregate>(
      new ListUserQuery(query),
    );

    return result;
  }
}
