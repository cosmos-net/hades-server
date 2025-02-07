import { IOptions } from '@common/domain/contracts/options.contract';
import { Criteria } from '@common/domain/criteria/criteria';
import { ListPermissionModel } from '@permission/domain/models/permission-list.model';
import { PermissionModel } from '@permission/domain/models/permission.model';

export abstract class IPermissionRepositoryContract {
  abstract persist(permission: PermissionModel): Promise<PermissionModel>;
  abstract getOneBy(UUID: string, options?: IOptions): Promise<PermissionModel>;
  abstract getOneByCombination(
    actionId: string,
    moduleId?: string,
    submoduleId?: string,
    options?: IOptions,
  ): Promise<PermissionModel>;
  abstract destroy(UUID: string): Promise<boolean>;
  abstract matching(criteria: Criteria): Promise<ListPermissionModel>;
}
