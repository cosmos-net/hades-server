import { IPermissionRepositoryContract } from '@permission/domain/contracts/permission-repository.contract';
import { PermissionAlreadyExistsError } from '@permission/domain/exceptions/permission-already-exists.exception';
import { PermissionModel } from '@permission/domain/models/permission.model';
import { IPermissionBaseSchema } from '@permission/domain/schemas/permission.schema-primitives';
import { Module } from '@permission/domain/value-objects/module.vo';
import { Submodule } from '@permission/domain/value-objects/submodule.vo';

export class CreatePermissionDomainService {
  constructor(private readonly permissionRepository: IPermissionRepositoryContract) {}

  async createPermission(permissionBaseSchema: IPermissionBaseSchema): Promise<PermissionModel> {
    const { action, module, submodule } = permissionBaseSchema;

    const permissionModelExists = await this.permissionRepository.getOneByCombination(
      action.id,
      undefined,
      undefined,
      {
        withArchived: true,
      },
    );

    if (permissionModelExists) {
      if (permissionModelExists.archive) {
        throw new PermissionAlreadyExistsError(
          `Permission already exists for action ${action.name}, module ${module.name} and submodule ${submodule.name} but it is archived`,
        );
      }

      const moduleVo = new Module(module.id, module.name);
      //TODO: Fix this maybe undefined value
      const submoduleVo = new Submodule(submodule.id, submodule.name);

      permissionModelExists.replaceModule(moduleVo, submoduleVo);

      if (!submodule) {
        permissionModelExists.replaceSubmodule(submoduleVo);
      }
    }

    const permissionModel = new PermissionModel(permissionBaseSchema);

    return permissionModel;
  }
}
