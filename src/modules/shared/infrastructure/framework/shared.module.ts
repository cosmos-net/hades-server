import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PermissionModule } from '@permission/infrastructure/framework/permission.module';
import { RoleModule } from '@role/infrastructure/framework/role.module';
import { SHARED_DATA_MEDIATOR_SERVICE } from '@shared/domain/constants/shared-injection-tokens.constants';
import { DataMediatorService } from '@shared/infrastructure/services/data-mediator-service/data-mediator.service';
import { PolicyAttacherProgramService } from '@shared/infrastructure/services/saga-orchestrator/policy/policy-attacher-program/policy-attacher-program.service';
import { PolicyDetacherProgramService } from '@shared/infrastructure/services/saga-orchestrator/policy/policy-detacher-program/policy-detacher-program.service';
import { UserModule } from '@user/infrastructure/framework/user.module';
import { UserAggregateFacadeService } from '@user/infrastructure/services/facade/user-aggregate-facade.service';
import { UserFacadeService } from '@user/infrastructure/services/facade/user-facade.service';

@Module({
  imports: [CqrsModule, RoleModule, UserModule, PermissionModule],
  providers: [
    DataMediatorService,
    PolicyAttacherProgramService,
    PolicyDetacherProgramService,
    // UserFacadeService,
    // UserAggregateFacadeService,
    // {
    //   provide: SHARED_DATA_MEDIATOR_SERVICE,
    //   useClass: DataMediatorService,
    // },
  ],
  controllers: [],
  exports: [DataMediatorService, PolicyAttacherProgramService, PolicyDetacherProgramService],
})
export class SharedModule {}
