import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Criteria } from '@common/domain/criteria/criteria';
import { ListPolicyFilter } from '@policy/application/use-cases/queries/list-policy/list-policy.filter-dto';
import { ListPolicyQuery } from '@policy/application/use-cases/queries/list-policy/list-policy.query';
import { ListPolicyDomainService } from '@policy/domain/domain-services/list-policy.domain-service';
import { ListPolicyModel } from '@policy/domain/models/list-policy.model';

@Injectable()
@QueryHandler(ListPolicyQuery)
export class ListPolicyUseCase implements IQueryHandler<ListPolicyQuery, ListPolicyModel> {
  constructor(private readonly listPolicyDomainService: ListPolicyDomainService) {}

  async execute(query: ListPolicyQuery): Promise<ListPolicyModel> {
    const { orderType, orderBy, limit, offset, withArchived, params } = query;

    const filtersMap = ListPolicyFilter.toFilterMap(params);

    const criteria = new Criteria(filtersMap, orderBy, orderType, limit, offset, withArchived);

    const policyList = await this.listPolicyDomainService.go(criteria);

    return policyList;
  }
}
