import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArchiveAssignmentUseCase } from '@assignment/application/use-cases/commands/archive-assignment/archive-assignment.use-case';
import { ArchiveAssignmentByUserUseCase } from '@assignment/application/use-cases/commands/archive-assignment-by-user/archive-assignment-by-user.use-case';
import { ArchiveAssignmentsByRoleUseCase } from '@assignment/application/use-cases/commands/archive-assignments-by-role/archive-assignments-by-role.use-case';
import { DestroyAssignmentUseCase } from '@assignment/application/use-cases/commands/destroy-assignment/destroy-assignment.use-case';
import { UpdateAssignmentUseCase } from '@assignment/application/use-cases/commands/update-assignment/update-assignment.use-case';
import { UserRoleAssignmentUseCase } from '@assignment/application/use-cases/commands/user-role-assignment/user-role-assignment.use-case';
import { GetAssignmentUseCase } from '@assignment/application/use-cases/queries/get-assignment/get-assignment.use-case';
import { ListAssignmentUseCase } from '@assignment/application/use-cases/queries/list-assignment/list-assignment.use-case';
import {
  ASSIGNMENT_ORCHESTRATOR_CONSUMER_SERVICE,
  ASSIGNMENT_REPOSITORY,
} from '@assignment/domain/constants/assignment-injection-tokens.constants';
import { ArchiveAssignmentByUserDomainService } from '@assignment/domain/domain-services/archive-assignment-by-user.domain-service';
import { ArchiveAssignmentDomainService } from '@assignment/domain/domain-services/archive-assignment.domain-service';
import { ArchiveAssignmentsByRoleDomainService } from '@assignment/domain/domain-services/archive-assignments-by-role.domain-service';
import { DestroyAssignmentDomainService } from '@assignment/domain/domain-services/destroy-assignment.domain-service';
import { GetAssignmentDomainService } from '@assignment/domain/domain-services/get-assignment.domain-service';
import { ListAssignmentDomainService } from '@assignment/domain/domain-services/list-assignment.domain-service';
import { UpdateAssignmentDomainService } from '@assignment/domain/domain-services/update-assignment.domain-service';
import { UserRoleAssignmentDomainService } from '@assignment/domain/domain-services/user-role-assignment.domain-service';
import { ArchiveAssignmentController } from '@assignment/infrastructure/controllers/commands/archive-assignment/archive-assignment.controller';
import { DestroyAssignmentController } from '@assignment/infrastructure/controllers/commands/destroy-assignment/destroy-assignment.controller';
import { UpdateAssignmentController } from '@assignment/infrastructure/controllers/commands/update-assignment/update-assignment.controller';
import { UserRoleAssignmentController } from '@assignment/infrastructure/controllers/commands/user-role-assignment/user-role-assignment.controller';
import { GetAssignmentController } from '@assignment/infrastructure/controllers/queries/get-assignment/get-assignment.controller';
import { ListAssignmentController } from '@assignment/infrastructure/controllers/queries/list-assignment/list-assignment.controller';
import { ArchiveAssignmentsHandler } from '@assignment/infrastructure/event-handlers/archive-assignments.handler';
import { AssignmentEntity } from '@assignment/infrastructure/persistence/typeorm/entities/assignment.entity';
import { AssignmentTypeormRepository } from '@assignment/infrastructure/persistence/typeorm/repositories/assignment-typeorm.repository';
import { AssignmentOrchestratorConsumerService } from '@assignment/infrastructure/services/assignment-orchestrator-consumer/assignment-orchestrator-consumer.service';
import { MediatorStoreService } from '@common/infrastructure/services/mediator-store-service/mediator-store.service';
import { SharedModule } from '@shared/infrastructure/framework/shared.module';

@Module({
  imports: [
    CqrsModule,
    SharedModule,
    TypeOrmModule.forFeature([AssignmentEntity]),
    EventEmitterModule.forRoot(),
  ],
  providers: [
    // UseCases
    UserRoleAssignmentUseCase,
    UpdateAssignmentUseCase,
    ArchiveAssignmentByUserUseCase,
    ArchiveAssignmentsByRoleUseCase,
    ArchiveAssignmentUseCase,
    DestroyAssignmentUseCase,
    GetAssignmentUseCase,
    ListAssignmentUseCase,

    // Domain Services && Inversion of dependencies
    UserRoleAssignmentDomainService,
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
    UpdateAssignmentDomainService,
    {
      provide: UpdateAssignmentDomainService,
      useFactory: (
        assignmentRepository,
        assignmentOrchestratorConsumerService,
      ): UpdateAssignmentDomainService => {
        return new UpdateAssignmentDomainService(
          assignmentRepository,
          assignmentOrchestratorConsumerService,
        );
      },
      inject: [ASSIGNMENT_REPOSITORY, ASSIGNMENT_ORCHESTRATOR_CONSUMER_SERVICE],
    },
    ArchiveAssignmentByUserDomainService,
    {
      provide: ArchiveAssignmentByUserDomainService,
      useFactory: (assignmentRepository): ArchiveAssignmentByUserDomainService => {
        return new ArchiveAssignmentByUserDomainService(assignmentRepository);
      },
      inject: [ASSIGNMENT_REPOSITORY],
    },
    ArchiveAssignmentsByRoleDomainService,
    {
      provide: ArchiveAssignmentsByRoleDomainService,
      useFactory: (assignmentRepository): ArchiveAssignmentsByRoleDomainService => {
        return new ArchiveAssignmentsByRoleDomainService(assignmentRepository);
      },
      inject: [ASSIGNMENT_REPOSITORY],
    },
    ArchiveAssignmentDomainService,
    {
      provide: ArchiveAssignmentDomainService,
      useFactory: (assignmentRepository): ArchiveAssignmentDomainService => {
        return new ArchiveAssignmentDomainService(assignmentRepository);
      },
      inject: [ASSIGNMENT_REPOSITORY],
    },
    DestroyAssignmentDomainService,
    {
      provide: DestroyAssignmentDomainService,
      useFactory: (assignmentRepository): DestroyAssignmentDomainService => {
        return new DestroyAssignmentDomainService(assignmentRepository);
      },
      inject: [ASSIGNMENT_REPOSITORY],
    },
    GetAssignmentDomainService,
    {
      provide: GetAssignmentDomainService,
      useFactory: (assignmentRepository): GetAssignmentDomainService => {
        return new GetAssignmentDomainService(assignmentRepository);
      },
      inject: [ASSIGNMENT_REPOSITORY],
    },
    ListAssignmentDomainService,
    {
      provide: ListAssignmentDomainService,
      useFactory: (assignmentRepository): ListAssignmentDomainService => {
        return new ListAssignmentDomainService(assignmentRepository);
      },
      inject: [ASSIGNMENT_REPOSITORY],
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
    ArchiveAssignmentsHandler,
    // Services
    MediatorStoreService,
  ],
  controllers: [
    UserRoleAssignmentController,
    UpdateAssignmentController,
    ArchiveAssignmentController,
    DestroyAssignmentController,
    GetAssignmentController,
    ListAssignmentController,
  ],
  exports: [],
})
export class AssignmentModule {}
