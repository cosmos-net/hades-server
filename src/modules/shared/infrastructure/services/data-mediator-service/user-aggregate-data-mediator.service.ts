import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetUserAggregateQuery } from '@user/application/use-cases/queries/get-user-aggregate/get-user-aggregate.query';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';

@Injectable()
export class UserAggregateDataMediatorService {
  constructor(private readonly queryBus: QueryBus) {}

  async getByUUID(getRoleQuery: GetUserAggregateQuery): Promise<UserAggregate> {
    const result = await this.queryBus.execute<GetUserAggregateQuery, UserAggregate>(
      new GetUserAggregateQuery(getRoleQuery),
    );

    return result;
  }
}
