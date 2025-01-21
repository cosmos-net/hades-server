import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RoleModule } from '@role/infrastructure/framework/role.module';
import { AccountOrchestratorProducerService } from '@shared/infrastructure/services/orchestrator-producer/account-orchestrator-producer.service';
import { OrchestratorProducerService } from '@shared/infrastructure/services/orchestrator-producer/orchestrator-producer.service';
import { RoleOrchestratorProducerService } from '@shared/infrastructure/services/orchestrator-producer/role-orchestrator-producer.service';
import { UserOrchestratorProducerService } from '@shared/infrastructure/services/orchestrator-producer/user-orchestrator-producer.service';
import { UserModule } from '@user/infrastructure/framework/user.module';

@Module({
  imports: [CqrsModule, RoleModule, UserModule],
  providers: [
    OrchestratorProducerService,
    RoleOrchestratorProducerService,
    UserOrchestratorProducerService,
    AccountOrchestratorProducerService,
  ],
  controllers: [],
  exports: [OrchestratorProducerService],
})
export class SharedModule {}
