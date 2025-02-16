import { Injectable } from '@nestjs/common';

import { AccountDataMediatorService } from '@shared/infrastructure/services/data-mediator-service/account-data-mediator.service';
import { RoleDataMediatorService } from '@shared/infrastructure/services/data-mediator-service/role-data-mediator.service';
import { UserAggregateDataMediatorService } from '@shared/infrastructure/services/data-mediator-service/user-aggregate-data-mediator.service';
import { UserDataMediatorService } from '@shared/infrastructure/services/data-mediator-service/user-data-mediator.service';

@Injectable()
export class DataMediatorService {
  constructor(
    private readonly roleDataMediatorService: RoleDataMediatorService,
    private readonly userAggregateDataMediatorService: UserAggregateDataMediatorService,
    private readonly userDataMediatorService: UserDataMediatorService,
    private readonly accountDataMediatorService: AccountDataMediatorService,
  ) {}

  public get role(): RoleDataMediatorService {
    return this.roleDataMediatorService;
  }

  public get userAggregate(): UserAggregateDataMediatorService {
    return this.userAggregateDataMediatorService;
  }

  public get user(): UserDataMediatorService {
    return this.userDataMediatorService;
  }

  public get account(): AccountDataMediatorService {
    return this.accountDataMediatorService;
  }
}
