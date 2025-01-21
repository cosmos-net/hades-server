import { AccountOrchestratorProducerService } from '@shared/infrastructure/services/orchestrator-producer/account-orchestrator-producer.service';

export interface ISessionOrchestratorConsumerContract {
  get account(): AccountOrchestratorProducerService;
}
