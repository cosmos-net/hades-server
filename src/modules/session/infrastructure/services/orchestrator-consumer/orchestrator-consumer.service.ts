import { Injectable } from '@nestjs/common';

import { ISessionOrchestratorConsumerContract } from '@session/domain/contracts/session-orchestrator-consumer.contract';
import { AccountOrchestratorProducerService } from '@shared/infrastructure/services/orchestrator-producer/account-orchestrator-producer.service';
import { OrchestratorProducerService } from '@shared/infrastructure/services/orchestrator-producer/orchestrator-producer.service';

@Injectable()
export class SessionOrchestratorConsumerService implements ISessionOrchestratorConsumerContract {
  constructor(private readonly orchestratorProducerService: OrchestratorProducerService) {}

  get account(): AccountOrchestratorProducerService {
    return this.orchestratorProducerService.account;
  }
}
