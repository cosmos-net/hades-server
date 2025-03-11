import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { FindPolicyQuery } from '@policy/application/use-cases/queries/find-policy/find-policy.query';
import { FindPolicyDomainService } from '@policy/domain/domain-services/find-policy.domain-service';
import { PolicyModel } from '@policy/domain/models/policy.model';

@Injectable()
@QueryHandler(FindPolicyQuery)
export class FindPolicyUseCase implements IQueryHandler<FindPolicyQuery, PolicyModel> {
  constructor(private readonly getPolicyDomainService: FindPolicyDomainService) {}

  async execute(query: FindPolicyQuery): Promise<PolicyModel> {
    const { roleUUID, permissionUUID, withArchived, failIfArchived } = query;

    const policyModel = await this.getPolicyDomainService.go(
      roleUUID,
      permissionUUID,
      withArchived,
      failIfArchived,
    );

    return policyModel;
  }
}
