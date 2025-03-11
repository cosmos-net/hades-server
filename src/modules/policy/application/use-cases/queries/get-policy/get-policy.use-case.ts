import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { GetPolicyQuery } from '@policy/application/use-cases/queries/get-policy/get-policy.query';
import { GetPolicyDomainService } from '@policy/domain/domain-services/get-policy.domain-service';
import { PolicyModel } from '@policy/domain/models/policy.model';

@Injectable()
@QueryHandler(GetPolicyQuery)
export class GetPolicyUseCase implements IQueryHandler<GetPolicyQuery> {
  constructor(private readonly getPolicyDomainService: GetPolicyDomainService) {}

  async execute(query: GetPolicyQuery): Promise<PolicyModel> {
    const { uuid, withArchived, failIfArchived } = query;

    const policyModel = await this.getPolicyDomainService.go(uuid, withArchived, failIfArchived);

    return policyModel;
  }
}
