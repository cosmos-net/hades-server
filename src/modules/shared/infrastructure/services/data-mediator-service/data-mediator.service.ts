import { Injectable } from '@nestjs/common';

import { PermissionFacadeService } from '@permission/infrastructure/services/facade/permission-facade.service';
import { PolicyFacadeService } from '@policy/infrastructure/services/facade/policy-facade.service';
import { RoleFacadeService } from '@role/infrastructure/services/facade/role-facade.service';
import { IDataMediatorServiceContract } from '@shared/domain/contracts/data-mediator-service.contract';
import { AccountFacadeService } from '@user/infrastructure/services/facade/account-facade.service';
import { UserAggregateFacadeService } from '@user/infrastructure/services/facade/user-aggregate-facade.service';
import { UserFacadeService } from '@user/infrastructure/services/facade/user-facade.service';

@Injectable()
export class DataMediatorService implements IDataMediatorServiceContract {
  constructor(
    private readonly userAggregateFacadeService: UserAggregateFacadeService,
    private readonly userFacadeService: UserFacadeService,
    private readonly accountFacadeService: AccountFacadeService,
    private readonly roleFacadeService: RoleFacadeService,
    private readonly permissionFacadeService: PermissionFacadeService,
    private readonly policyFacadeService: PolicyFacadeService,
  ) {}

  public get userAggregate(): UserAggregateFacadeService {
    return this.userAggregateFacadeService;
  }

  public get user(): UserFacadeService {
    return this.userFacadeService;
  }

  public get account(): AccountFacadeService {
    return this.accountFacadeService;
  }

  public get role(): RoleFacadeService {
    return this.roleFacadeService;
  }

  public get permission(): PermissionFacadeService {
    return this.permissionFacadeService;
  }

  public get policy(): PolicyFacadeService {
    return this.policyFacadeService;
  }
}
