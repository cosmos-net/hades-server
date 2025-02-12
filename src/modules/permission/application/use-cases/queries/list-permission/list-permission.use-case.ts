import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ListAssignmentQuery } from '@assignment/application/use-cases/queries/list-assignment/list-assignment.query';
import { ListAssignmentDomainService } from '@assignment/domain/domain-services/list-assignment.domain-service';
import { ListAssignmentModel } from '@assignment/domain/models/assignment-list.model';
import { Criteria } from '@common/domain/criteria/criteria';

@Injectable()
@QueryHandler(ListAssignmentQuery)
export class ListAssignmentUseCase
  implements IQueryHandler<ListAssignmentQuery, ListAssignmentModel>
{
  constructor(private readonly listAssignmentDomainService: ListAssignmentDomainService) {}

  async execute(query: ListAssignmentQuery): Promise<ListAssignmentModel> {
    const { orderType, orderBy, limit, offset, withArchived, filtersMap } = query;

    const criteria = new Criteria(filtersMap, orderBy, orderType, limit, offset, withArchived);

    const assignments = await this.listAssignmentDomainService.go(criteria);

    return assignments;
  }
}
