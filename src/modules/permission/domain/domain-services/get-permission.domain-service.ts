import { IPermissionRepositoryContract } from '@permission/domain/contracts/permission-repository.contract';
import { PermissionAlreadyIsArchivedException } from '@permission/domain/exceptions/permission-already-is-archived.exception';
import { PermissionNotFoundException } from '@permission/domain/exceptions/permission-not-found.exception';
import { PermissionModel } from '@permission/domain/models/permission.model';

export class GetPermissionDomainService {
  constructor(private readonly permissionRepository: IPermissionRepositoryContract) {}

  async go(uuid: string, withArchived: boolean, failIfArchived: boolean): Promise<PermissionModel> {
    const permissionModel = await this.permissionRepository.getOneBy(uuid, { withArchived });

    if (!permissionModel) {
      throw new PermissionNotFoundException(`Permission ${uuid} not found`);
    }

    if (failIfArchived && permissionModel.archivedAt) {
      throw new PermissionAlreadyIsArchivedException(`Permission ${uuid} is archived`);
    }

    return permissionModel;
  }
}
