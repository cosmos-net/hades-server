import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PermissionModule } from '@permission/infrastructure/framework/permission.module';
import { PolicyModule } from '@policy/infrastructure/framework/policy.module';
import { RoleModule } from '@role/infrastructure/framework/role.module';
import { DataMediatorService } from '@shared/infrastructure/services/data-mediator-service/data-mediator.service';
import { PolicyAttacherProgramService } from '@shared/infrastructure/services/saga-orchestrator/policy/policy-attacher-program/policy-attacher-program.service';
import { PolicyDetacherProgramService } from '@shared/infrastructure/services/saga-orchestrator/policy/policy-detacher-program/policy-detacher-program.service';
import { UserModule } from '@user/infrastructure/framework/user.module';

@Module({
  imports: [
    CqrsModule,
    RoleModule,
    UserModule,
    PermissionModule,
    forwardRef((): typeof PolicyModule => PolicyModule),
  ],
  providers: [DataMediatorService, PolicyAttacherProgramService, PolicyDetacherProgramService],
  controllers: [],
  exports: [DataMediatorService, PolicyAttacherProgramService, PolicyDetacherProgramService],
})
export class SharedModule {}
