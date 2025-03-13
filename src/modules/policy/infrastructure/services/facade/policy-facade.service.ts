import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetPolicyQuery } from '@policy/application/use-cases/queries/get-policy/get-policy.query';
import { ListPolicyQuery } from '@policy/application/use-cases/queries/list-policy/list-policy.query';
import { ListPolicyModel } from '@policy/domain/models/list-policy.model';
import { PolicyModel } from '@policy/domain/models/policy.model';

@Injectable()
export class PolicyFacadeService {
  constructor(private readonly queryBus: QueryBus) {}

  async get(query: GetPolicyQuery): Promise<PolicyModel> {
    const result = await this.queryBus.execute<GetPolicyQuery, PolicyModel>(
      new GetPolicyQuery(query),
    );

    return result;
  }

  async list(query: ListPolicyQuery): Promise<ListPolicyModel> {
    const result = await this.queryBus.execute<ListPolicyQuery, ListPolicyModel>(
      new ListPolicyQuery(query),
    );

    return result;
  }
}
