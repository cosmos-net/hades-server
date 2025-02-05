import { ListPermissionModel } from '@permission/domain/models/permission-list.model';
import { PermissionModel } from '@permission/domain/models/permission.model';

import { IOptions } from '@common/domain/contracts/options.contract';
import { Criteria } from '@common/domain/criteria/criteria';

export abstract class IPermissionRepositoryContract {
  abstract persist(permission: PermissionModel): Promise<PermissionModel>;
  abstract getOneBy(UUID: string, options?: IOptions): Promise<PermissionModel>;
  abstract destroy(UUID: string): Promise<boolean>;
  abstract archive(UUID: string): Promise<boolean>;
  abstract matching(criteria: Criteria): Promise<ListPermissionModel>;
}
