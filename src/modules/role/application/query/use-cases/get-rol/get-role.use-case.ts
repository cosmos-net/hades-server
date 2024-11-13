import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetRoleQuery } from '@role/application/query/use-cases/get-rol/get-role.query';
import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { RoleModel } from '@role/domain/models/role.model';
import { GetRoleDomainService } from '@role/domain/services/get-role.domain-service';

@Injectable()
@QueryHandler(GetRoleQuery)
export class GetRoleUseCase implements IQueryHandler<GetRoleQuery> {
  constructor(
    private readonly getRoleDomainService: GetRoleDomainService,
    private readonly repository: IRoleRepositoryContract,
  ) {}

  async execute(query: GetRoleQuery): Promise<RoleModel> {
    const { uuid } = query;

    const roleModel = await this.getRoleDomainService.go(uuid);

    return roleModel;
  }
}
