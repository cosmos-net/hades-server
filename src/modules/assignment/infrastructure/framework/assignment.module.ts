import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRoleAssignmentUseCase } from '@assignment/application/use-cases/commands/user-role-assignment.use-case';
import {
  ASSIGNMENT_ORCHESTRATOR_CONSUMER_SERVICE,
  ASSIGNMENT_REPOSITORY,
} from '@assignment/domain/constants/assignment-injection-tokens.constants';
import { UserRoleAssignmentDomainService } from '@assignment/domain/domain-services/user-role-assignment.domain-service';
import { UserRoleAssignmentController } from '@assignment/infrastructure/controllers/commands/user-role-assignment/user-role-assignment.controller';
import { AssignmentEntity } from '@assignment/infrastructure/persistence/typeorm/entities/assignment.entity';
import { AssignmentTypeormRepository } from '@assignment/infrastructure/persistence/typeorm/repositories/assignment-typeorm.repository';
import { AssignmentOrchestratorConsumerService } from '@assignment/infrastructure/services/assignment-orchestrator-consumer/assignment-orchestrator-consumer.service';
import { SharedModule } from '@shared/infrastructure/framework/shared.module';

@Module({
  imports: [CqrsModule, SharedModule, TypeOrmModule.forFeature([AssignmentEntity])],
  providers: [
    // UseCases
    UserRoleAssignmentUseCase,
    // Domain Services
    UserRoleAssignmentDomainService,
    // Inversion of dependencies, Control principle (IoC) to domain services
    {
      provide: UserRoleAssignmentDomainService,
      useFactory: (
        assignmentRepository,
        assignmentOrchestratorConsumerService,
      ): UserRoleAssignmentDomainService => {
        return new UserRoleAssignmentDomainService(
          assignmentRepository,
          assignmentOrchestratorConsumerService,
        );
      },
      inject: [ASSIGNMENT_REPOSITORY, ASSIGNMENT_ORCHESTRATOR_CONSUMER_SERVICE],
    },
    // Repositories
    {
      provide: ASSIGNMENT_REPOSITORY,
      useClass: AssignmentTypeormRepository,
    },
    {
      provide: ASSIGNMENT_ORCHESTRATOR_CONSUMER_SERVICE,
      useClass: AssignmentOrchestratorConsumerService,
    },
    // Event Handlers
  ],
  controllers: [UserRoleAssignmentController],
  exports: [],
})
export class AssignmentModule {}
