import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetUserAggregateQuery } from '@user/application/use-cases/queries/get-user-aggregate/get-user-aggregate.query';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { GetUserAggregateDomainService } from '@user/domain/domain-services/get-user-aggregate.domain-service';

@Injectable()
@QueryHandler(GetUserAggregateQuery)
export class GetUserAggregateUseCase implements IQueryHandler<GetUserAggregateQuery> {
  constructor(private readonly getUserDomainService: GetUserAggregateDomainService) {}

  async execute(query: GetUserAggregateQuery): Promise<UserAggregate> {
    const { uuid, withArchived, failIfArchived } = query;

    const userAggregate = await this.getUserDomainService.go(uuid, withArchived, failIfArchived);

    return userAggregate;
  }
}
