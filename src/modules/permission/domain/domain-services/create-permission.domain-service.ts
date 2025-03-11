import { IPermissionRepositoryContract } from '@permission/domain/contracts/permission-repository.contract';
import { PermissionAlreadyExistsError } from '@permission/domain/exceptions/permission-already-exists.exception';
import { PermissionModel } from '@permission/domain/models/permission.model';
import { ICreatePermissionType } from '@permission/domain/schemas/permission.schema-primitives';
import { Module } from '@permission/domain/value-objects/module.vo';
import { Submodule } from '@permission/domain/value-objects/submodule.vo';

export class CreatePermissionDomainService {
  constructor(private readonly permissionRepository: IPermissionRepositoryContract) {}

  async go(params: ICreatePermissionType): Promise<PermissionModel> {
    const { uuid, action, module, submodule, description } = params;

    const permissionModelExists = await this.permissionRepository.getOneBy(action.id, {
      withArchived: true,
    });

    if (permissionModelExists) {
      if (permissionModelExists.archive) {
        throw new PermissionAlreadyExistsError(
          `Permission already exists for action ${action.name}, module ${module.name} and submodule ${submodule.name} but it is archived`,
        );
      }

      const moduleVo = new Module(module.id, module.name);
      const submoduleVo = submodule ? new Submodule(submodule.id, submodule.name) : null;

      permissionModelExists.replaceOrigin(moduleVo, submoduleVo);

      if (description) {
        permissionModelExists.redescribe(description);
      }
    }

    const permissionModel = PermissionModel.create({
      uuid,
      action,
      module,
      submodule,
      description,
    });

    return permissionModel;
  }
}
