import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RoleModule } from '@role/infrastructure/framework/role.module';
import { AccountDataMediatorService } from '@shared/infrastructure/services/data-mediator-service/account-data-mediator.service';
import { DataMediatorService } from '@shared/infrastructure/services/data-mediator-service/data-mediator.service';
import { RoleDataMediatorService } from '@shared/infrastructure/services/data-mediator-service/role-data-mediator.service';
import { UserAggregateDataMediatorService } from '@shared/infrastructure/services/data-mediator-service/user-aggregate-data-mediator.service';
import { UserDataMediatorService } from '@shared/infrastructure/services/data-mediator-service/user-data-mediator.service';
import { PolicyCreatorProgramService } from '@shared/infrastructure/services/saga-orchestrator/policy/policy-creator-program/policy-creator-program.service';
import { UserModule } from '@user/infrastructure/framework/user.module';

@Module({
  imports: [CqrsModule, RoleModule, UserModule],
  providers: [
    DataMediatorService,
    RoleDataMediatorService,
    UserAggregateDataMediatorService,
    UserDataMediatorService,
    AccountDataMediatorService,
    PolicyCreatorProgramService,
  ],
  controllers: [],
  exports: [DataMediatorService],
})
export class SharedModule {}
