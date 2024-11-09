import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { GetRoleQuery } from '@role/application/queries/get-role/get-role.query';
import { RoleModel } from '@role/domain/models/role.model';
import { GetRoleDomainService } from '@role/domain/services/get-role.domain-service';

@Injectable()
@QueryHandler(GetRoleQuery)
export class GetRoleUseCase implements IQueryHandler<GetRoleQuery> {
  constructor(private readonly getRoleDomainService: GetRoleDomainService) {}

  async execute(query: GetRoleQuery): Promise<RoleModel> {
    const { uuid } = query;

    const roleModel = await this.getRoleDomainService.go(uuid);

    return roleModel;
  }
}
