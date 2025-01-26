import { Injectable } from '@nestjs/common';

import { AccountOrchestratorProducerService } from '@shared/infrastructure/services/orchestrator-producer/account-orchestrator-producer.service';
import { RoleOrchestratorProducerService } from '@shared/infrastructure/services/orchestrator-producer/role-orchestrator-producer.service';
import { UserAggregateOrchestratorProducerService } from '@shared/infrastructure/services/orchestrator-producer/user-aggregate-orchestrator-producer.service';
import { UserOrchestratorProducerService } from '@shared/infrastructure/services/orchestrator-producer/user-orchestrator-producer.service';

@Injectable()
export class OrchestratorProducerService {
  constructor(
    private readonly roleOrchestratorProducerService: RoleOrchestratorProducerService,
    private readonly userAggregateOrchestratorProducerService: UserAggregateOrchestratorProducerService,
    private readonly userOrchestratorProducerService: UserOrchestratorProducerService,
    private readonly accountOrchestratorProducerService: AccountOrchestratorProducerService,
  ) {}

  public get role(): RoleOrchestratorProducerService {
    return this.roleOrchestratorProducerService;
  }

  public get userAggregate(): UserAggregateOrchestratorProducerService {
    return this.userAggregateOrchestratorProducerService;
  }

  public get user(): UserOrchestratorProducerService {
    return this.userOrchestratorProducerService;
  }

  public get account(): AccountOrchestratorProducerService {
    return this.accountOrchestratorProducerService;
  }
}
