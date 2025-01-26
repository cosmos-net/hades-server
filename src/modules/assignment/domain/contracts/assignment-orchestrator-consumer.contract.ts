import { RoleOrchestratorProducerService } from '@shared/infrastructure/services/orchestrator-producer/role-orchestrator-producer.service';
import { UserOrchestratorProducerService } from '@shared/infrastructure/services/orchestrator-producer/user-orchestrator-producer.service';

export interface IAssignmentOrchestratorConsumerContract {
  get role(): RoleOrchestratorProducerService;
  get user(): UserOrchestratorProducerService;
}
