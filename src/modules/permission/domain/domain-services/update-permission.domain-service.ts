import { IPermissionRepositoryContract } from '@permission/domain/contracts/permission-repository.contract';
import { PermissionNotFoundException } from '@permission/domain/exceptions/permission-not-found.exception';
import { PermissionModel } from '@permission/domain/models/permission.model';

export class UpdatePermissionDomainService {
  constructor(private readonly permissionRepository: IPermissionRepositoryContract) {}

  async go(uuid: string, description?: string): Promise<PermissionModel> {
    const permissionModel = await this.permissionRepository.getOneBy(uuid, { withArchived: true });

    if (!permissionModel) {
      throw new PermissionNotFoundException(`Permission Not found`);
    }

    permissionModel.redescribe({ description });

    return permissionModel;
  }
}
