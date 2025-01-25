import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetUserQuery } from '@user/application/use-cases/queries/get-user/get-user.query';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';

@Injectable()
export class UserAggregateOrchestratorProducerService {
  constructor(private readonly queryBus: QueryBus) {}

  async getByUUID(getRoleQuery: GetUserQuery): Promise<UserAggregate> {
    const result = await this.queryBus.execute<GetUserQuery, UserAggregate>(
      new GetUserQuery(getRoleQuery),
    );

    return result;
  }
}
