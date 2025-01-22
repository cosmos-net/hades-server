import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Criteria } from '@common/domain/criteria/criteria';
import { ListSessionQuery } from '@session/application/use-cases/queries/list-session/list-session.query';
import { ListSessionDomainService } from '@session/domain/domain-services/list-session.domain-service';
import { ListSessionModel } from '@session/domain/models/session-list.model';

@Injectable()
@QueryHandler(ListSessionQuery)
export class ListSessioneUseCase implements IQueryHandler<ListSessionQuery, ListSessionModel> {
  constructor(private readonly listSessionDomainService: ListSessionDomainService) {}

  async execute(query: ListSessionQuery): Promise<ListSessionModel> {
    const { orderType, orderBy, limit, offset, withArchived, filtersMap } = query;

    const criteria = new Criteria(filtersMap, orderBy, orderType, limit, offset, withArchived);

    const sessions = await this.listSessionDomainService.go(criteria);

    return sessions;
  }
}
