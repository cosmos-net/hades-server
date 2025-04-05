import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ListPoliciesByAccountQuery } from '@policy/application/use-cases/queries/list-policies-by-account/list-policies-by-account.query';
import { ListPoliciesByAccountDomainService } from '@policy/domain/domain-services/list-policies-by-account.domain-service';
import { ListPolicyModel } from '@policy/domain/models/list-policy.model';

@Injectable()
@QueryHandler(ListPoliciesByAccountQuery)
export class ListPoliciesByAccountUseCase
  implements IQueryHandler<ListPoliciesByAccountQuery, ListPolicyModel>
{
  constructor(
    private readonly listPoliciesByAccountDomainService: ListPoliciesByAccountDomainService,
  ) {}

  async execute(query: ListPoliciesByAccountQuery): Promise<ListPolicyModel> {
    const { accountUUID, withArchived } = query;

    const listPolicyModel = await this.listPoliciesByAccountDomainService.go(
      accountUUID,
      withArchived,
    );

    return listPolicyModel;
  }
}