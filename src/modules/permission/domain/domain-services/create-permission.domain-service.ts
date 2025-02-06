import { IPermissionRepositoryContract } from '@permission/domain/contracts/permission-repository.contract';
import { PermissionAlreadyExistsError } from '@permission/domain/exceptions/permission-already-exists.exception';
import { PermissionModel } from '@permission/domain/models/permission.model';
import { IPermissionSchemaPrimitives } from '@permission/domain/schemas/permission.schema-primitives';

export class CreatePermissionDomainService {
  constructor(private readonly permissionRepository: IPermissionRepositoryContract) {}

  async createPermission(
    permissionSchemaPrimitives: IPermissionSchemaPrimitives,
  ): Promise<PermissionModel> {
    const { action, module, submodule } = permissionSchemaPrimitives;

    const permissionAlreadyExists = await this.permissionRepository.getOneByCombination(
      action.id,
      module.id,
      submodule.id,
      {
        withArchived: true,
      },
    );

    if (permissionAlreadyExists) {
      const messageIfArchived = permissionAlreadyExists.archivedAt ? 'but it is archived' : '';

      throw new PermissionAlreadyExistsError(
        `Permission already exists for action ${action.name}, module ${module.name} and submodule ${submodule.name} ${messageIfArchived}`,
      );
    }

    const permissionModel = new PermissionModel(permissionSchemaPrimitives);

    return permissionModel;
  }
}
