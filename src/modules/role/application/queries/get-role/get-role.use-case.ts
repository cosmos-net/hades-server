import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { GetRoleQuery } from '@role/application/queries/get-role/get-role.query';
import { GetRoleDomainService } from '@role/domain/domain-service/get-role.domain-service';
import { RoleModel } from '@role/domain/models/role.model';

@Injectable()
@QueryHandler(GetRoleQuery)
export class GetRoleUseCase implements IQueryHandler<GetRoleQuery> {
  constructor(private readonly getRoleDomainService: GetRoleDomainService) {}

  async execute(query: GetRoleQuery): Promise<RoleModel> {
    const { uuid, withArchived } = query;

    const roleModel = await this.getRoleDomainService.go(uuid, withArchived);

    return roleModel;
  }
}
