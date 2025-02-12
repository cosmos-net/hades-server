import { Criteria } from '@common/domain/criteria/criteria';
import { IPermissionRepositoryContract } from '@permission/domain/contracts/permission-repository.contract';
import { PermissionNotFoundException } from '@permission/domain/exceptions/permission-not-found.exception';
import { ListPermissionModel } from '@permission/domain/models/permission-list.model';

export class ListPermissionDomainService {
  constructor(private readonly permissionRepository: IPermissionRepositoryContract) {}

  async go(criteria: Criteria): Promise<ListPermissionModel> {
    const permissions = await this.permissionRepository.matching(criteria);

    if (permissions.getTotal === 0) {
      throw new PermissionNotFoundException('No permissions found');
    }

    return permissions;
  }
}
