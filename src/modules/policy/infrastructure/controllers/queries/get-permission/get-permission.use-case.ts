import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { GetPermissionQuery } from '@permission/application/use-cases/queries/get-permission/get-permission.query';
import { GetPermissionDomainService } from '@permission/domain/domain-services/get-permission.domain-service';
import { PermissionModel } from '@permission/domain/models/permission.model';

@Injectable()
@QueryHandler(GetPermissionQuery)
export class GetPermissionUseCase implements IQueryHandler<GetPermissionQuery> {
  constructor(private readonly getPermissionDomainService: GetPermissionDomainService) {}

  async execute(query: GetPermissionQuery): Promise<PermissionModel> {
    const { uuid, withArchived, failIfArchived } = query;

    const permissionModel = await this.getPermissionDomainService.go(
      uuid,
      withArchived,
      failIfArchived,
    );

    return permissionModel;
  }
}
