import { PermissionFacadeService } from '@permission/infrastructure/services/facade/permission-facade.service';
import { RoleFacadeService } from '@role/infrastructure/services/facade/role-facade.service';
import { AccountFacadeService } from '@user/infrastructure/services/facade/account-facade.service';
import { UserAggregateFacadeService } from '@user/infrastructure/services/facade/user-aggregate-facade.service';
import { UserFacadeService } from '@user/infrastructure/services/facade/user-facade.service';

export interface IDataMediatorServiceContract {
  userAggregate: UserAggregateFacadeService;
  user: UserFacadeService;
  account: AccountFacadeService;
  permission: PermissionFacadeService;
  role: RoleFacadeService;
}
