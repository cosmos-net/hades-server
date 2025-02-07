import { IPermissionRepositoryContract } from '@permission/domain/contracts/permission-repository.contract';
import { PermissionModel } from '@permission/domain/models/permission.model';

export class UpdatePermissionDomainService {
  constructor(private readonly permissionRepository: IPermissionRepositoryContract) {}

  async go(uuid: string, description?: string): Promise<PermissionModel> {
    const permissionModel = await this.permissionRepository.getOneBy(uuid, { withArchived: true });

    if (!permissionModel) {
      // TODO: Create a custom exception
      throw new Error(`Permission Not found`);
    }

    permissionModel.redescribe({ description });

    return permissionModel;
  }
}
