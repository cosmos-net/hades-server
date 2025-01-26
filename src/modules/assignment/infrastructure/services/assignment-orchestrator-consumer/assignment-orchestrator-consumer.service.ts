import { Injectable } from '@nestjs/common';

import { IAssignmentOrchestratorConsumerContract } from '@assignment/domain/contracts/assignment-orchestrator-consumer.contract';
import { OrchestratorProducerService } from '@shared/infrastructure/services/orchestrator-producer/orchestrator-producer.service';
import { RoleOrchestratorProducerService } from '@shared/infrastructure/services/orchestrator-producer/role-orchestrator-producer.service';
import { UserOrchestratorProducerService } from '@shared/infrastructure/services/orchestrator-producer/user-orchestrator-producer.service';

@Injectable()
export class AssignmentOrchestratorConsumerService
  implements IAssignmentOrchestratorConsumerContract
{
  constructor(private readonly orchestratorProducerService: OrchestratorProducerService) {}

  get role(): RoleOrchestratorProducerService {
    return this.orchestratorProducerService.role;
  }

  get user(): UserOrchestratorProducerService {
    return this.orchestratorProducerService.user;
  }
}
