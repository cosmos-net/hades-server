import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArchivePolicyUseCase } from '@policy/application/use-cases/commands/archive-policy/archive-policy.use-case';
import { AttachPolicyUseCase } from '@policy/application/use-cases/commands/attach-policy/attach-policy.use-case';
import { CreatePolicyUseCase } from '@policy/application/use-cases/commands/create-policy/create-policy.use-case';
import { DestroyPolicyUseCase } from '@policy/application/use-cases/commands/destroy-policy/destroy-policy.use-case';
import { DetachPolicyUseCase } from '@policy/application/use-cases/commands/detach-policy/detach-policy.use-case';
import { RedescribePolicyUseCase } from '@policy/application/use-cases/commands/redescribe-policy/redescribe-policy.use-case';
import { UnarchivePolicyUseCase } from '@policy/application/use-cases/commands/unarchive-policy/unarchive-policy.use-case';
import { FindPolicyUseCase } from '@policy/application/use-cases/queries/find-policy/find-policy.use-case';
import { GetPermissionUseCase } from '@policy/application/use-cases/queries/get-permission/get-permission.use-case';
import { GetPolicyUseCase } from '@policy/application/use-cases/queries/get-policy/get-policy.use-case';
import { ListPermissionUseCase } from '@policy/application/use-cases/queries/list-permission/list-permission.use-case';
import { ListPoliciesByAccountUseCase } from '@policy/application/use-cases/queries/list-policies-by-account/list-policies-by-account.use-case';
import { ListPolicyUseCase } from '@policy/application/use-cases/queries/list-policy/list-policy.use-case';
import { PERMISSION_REPOSITORY, POLICY_REPOSITORY } from '@policy/domain/constants/injection-tokens';
import { ArchivePolicyDomainService } from '@policy/domain/domain-services/archive-policy.domain-service';
import { AttachPolicyDomainService } from '@policy/domain/domain-services/attach-policy.domain-service';
import { CreatePolicyDomainService } from '@policy/domain/domain-services/create-policy.domain-service';
import { DestroyPolicyDomainService } from '@policy/domain/domain-services/destroy-policy.domain-service';
import { DetachPolicyDomainService } from '@policy/domain/domain-services/detach-policy.domain-service';
import { FindPolicyDomainService } from '@policy/domain/domain-services/find-policy.domain-service';
import { GetPermissionDomainService } from '@policy/domain/domain-services/get-permission.domain-service';
import { GetPolicyDomainService } from '@policy/domain/domain-services/get-policy.domain-service';
import { ListPermissionDomainService } from '@policy/domain/domain-services/list-permission.domain-service';
import { ListPoliciesByAccountDomainService } from '@policy/domain/domain-services/list-policies-by-account.domain-service';
import { ListPolicyDomainService } from '@policy/domain/domain-services/list-policy.domain-service';
import { RedescribePolicyDomainService } from '@policy/domain/domain-services/redescribe-policy.domain-service';
import { UnarchivePolicyDomainService } from '@policy/domain/domain-services/unarchive-policy.domain-service';
import { ArchivePolicyController } from '@policy/infrastructure/controllers/commands/archive-policy/archive-policy.controller';
import { AttachPolicyController } from '@policy/infrastructure/controllers/commands/attach-policy/attach-policy.controller';
import { DestroyPolicyController } from '@policy/infrastructure/controllers/commands/destroy-policy/destroy-policy.controller';
import { DetachPolicyController } from '@policy/infrastructure/controllers/commands/detach-policy/detach-policy.controller';
import { RedescribePolicyController } from '@policy/infrastructure/controllers/commands/redescribe-policy/redescribe-policy.controller';
import { UnarchivePolicyController } from '@policy/infrastructure/controllers/commands/unarchive-policy/unarchive-policy.controller';
import { FindPolicyController } from '@policy/infrastructure/controllers/queries/find-policy/find-policy.controller';
import { GetPermissionController } from '@policy/infrastructure/controllers/queries/get-permission/get-permission.controller';
import { GetPolicyController } from '@policy/infrastructure/controllers/queries/get-policy/get-policy.controller';
import { ListPermissionController } from '@policy/infrastructure/controllers/queries/list-permission/list-permission.controller';
import { ListPoliciesByAccountController } from '@policy/infrastructure/controllers/queries/list-policies-by-account/list-policies-by-account.controller';
import { ListPolicyController } from '@policy/infrastructure/controllers/queries/list-policy/list-policy.controller';
import { PolicyCreateEventHandler } from '@policy/infrastructure/event-handlers/policy-create.event-handler';
import { PolicyDestroyEventHandler } from '@policy/infrastructure/event-handlers/policy-destroy.event-handler';
import { PermissionEntity } from '@policy/infrastructure/persistence/typeorm/entities/permission.entity';
import { PolicyEntity } from '@policy/infrastructure/persistence/typeorm/entities/policy.entity';
import { PermissionTypeormRepository } from '@policy/infrastructure/persistence/typeorm/repositories/permission-typeorm.repository';
import { PolicyTypeormRepository } from '@policy/infrastructure/persistence/typeorm/repositories/policy-typeorm.repository';
import { PolicyFacadeService } from '@policy/infrastructure/services/facade/policy-facade.service';
import { SHARED_DATA_MEDIATOR_SERVICE } from '@shared/domain/constants/injection-tokens';
import { IDataMediatorServiceContract } from '@shared/domain/contracts/data-mediator-service.contract';

@Module({
  imports: [
    TypeOrmModule.forFeature([PolicyEntity, PermissionEntity]),
    CqrsModule,
    EventEmitterModule.forRoot(),
  ],
  providers: [
    // UseCases
    ArchivePolicyUseCase,
    UnarchivePolicyUseCase,
    DestroyPolicyUseCase,
    GetPolicyUseCase,
    GetPermissionUseCase,
    ListPermissionUseCase,
    ListPolicyUseCase,
    FindPolicyUseCase,
    AttachPolicyUseCase,
    DetachPolicyUseCase,
    RedescribePolicyUseCase,
    CreatePolicyUseCase,
    ListPoliciesByAccountUseCase,
    // Domain Services
    ArchivePolicyDomainService,
    {
      provide: ArchivePolicyDomainService,
      useFactory: (repository): ArchivePolicyDomainService => {
        return new ArchivePolicyDomainService(repository);
      },
      inject: [POLICY_REPOSITORY],
    },
    UnarchivePolicyDomainService,
    {
      provide: UnarchivePolicyDomainService,
      useFactory: (repository): UnarchivePolicyDomainService => {
        return new UnarchivePolicyDomainService(repository);
      },
      inject: [POLICY_REPOSITORY],
    },
    DestroyPolicyDomainService,
    {
      provide: DestroyPolicyDomainService,
      useFactory: (
        repository,
        policy: PolicyModel,
      ): DestroyPolicyDomainService => {
        return new DestroyPolicyDomainService(repository, policy);
      },
      inject: [POLICY_REPOSITORY, PolicyModel],
    },
    GetPolicyDomainService,
    {
      provide: GetPolicyDomainService,
      useFactory: (repository): GetPolicyDomainService => {
        return new GetPolicyDomainService(repository);
      },
      inject: [POLICY_REPOSITORY],
    },
    GetPermissionDomainService,
    {
      provide: GetPermissionDomainService,
      useFactory: (repository): GetPermissionDomainService => {
        return new GetPermissionDomainService(repository);
      },
      inject: [PERMISSION_REPOSITORY],
    },
    ListPermissionDomainService,
    {
      provide: ListPermissionDomainService,
      useFactory: (repository): ListPermissionDomainService => {
        return new ListPermissionDomainService(repository);
      },
      inject: [PERMISSION_REPOSITORY],
    },
    ListPolicyDomainService,
    {
      provide: ListPolicyDomainService,
      useFactory: (repository): ListPolicyDomainService => {
        return new ListPolicyDomainService(repository);
      },
      inject: [POLICY_REPOSITORY],
    },
    FindPolicyDomainService,
    {
      provide: FindPolicyDomainService,
      useFactory: (repository): FindPolicyDomainService => {
        return new FindPolicyDomainService(repository);
      },
      inject: [POLICY_REPOSITORY],
    },
    AttachPolicyDomainService,
    {
      provide: AttachPolicyDomainService,
      useFactory: (
        repository,
        dataMediatorService,
      ): AttachPolicyDomainService => {
        return new AttachPolicyDomainService(repository, dataMediatorService);
      },
      inject: [POLICY_REPOSITORY, SHARED_DATA_MEDIATOR_SERVICE],
    },
    DetachPolicyDomainService,
    {
      provide: DetachPolicyDomainService,
      useFactory: (
        repository,
        policy: PolicyModel,
      ): DetachPolicyDomainService => {
        return new DetachPolicyDomainService(repository, policy);
      },
      inject: [POLICY_REPOSITORY, PolicyModel],
    },
    RedescribePolicyDomainService,
    {
      provide: RedescribePolicyDomainService,
      useFactory: (repository): RedescribePolicyDomainService => {
        return new RedescribePolicyDomainService(repository);
      },
      inject: [POLICY_REPOSITORY],
    },
    CreatePolicyDomainService,
    {
      provide: CreatePolicyDomainService,
      useFactory: (
        repository,
        dataMediatorService,
      ): CreatePolicyDomainService => {
        return new CreatePolicyDomainService(
          repository,
          dataMediatorService,
        );
      },
      inject: [POLICY_REPOSITORY, SHARED_DATA_MEDIATOR_SERVICE],
    },
    ListPoliciesByAccountDomainService,
    {
      provide: ListPoliciesByAccountDomainService,
      useFactory: (
        repository,
        dataMediatorService,
      ): ListPoliciesByAccountDomainService => {
        return new ListPoliciesByAccountDomainService(
          repository,
          dataMediatorService,
        );
      },
      inject: [POLICY_REPOSITORY, SHARED_DATA_MEDIATOR_SERVICE],
    },
    // Event Handlers
    PolicyCreateEventHandler,
    PolicyDestroyEventHandler,
    // Models
    PolicyModel,
    // Services
    PolicyFacadeService,
    // Repositories
    {
      provide: PERMISSION_REPOSITORY,
      useClass: PermissionTypeormRepository,
    },
    {
      provide: POLICY_REPOSITORY,
      useClass: PolicyTypeormRepository,
    },
  ],
  controllers: [
    ArchivePolicyController,
    UnarchivePolicyController,
    DestroyPolicyController,
    GetPolicyController,
    GetPermissionController,
    ListPermissionController,
    ListPolicyController,
    FindPolicyController,
    AttachPolicyController,
    DetachPolicyController,
    RedescribePolicyController,
    ListPoliciesByAccountController,
  ],
  exports: [POLICY_REPOSITORY, PERMISSION_REPOSITORY, PolicyFacadeService],
})
export class PolicyModule {}
