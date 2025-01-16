import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateActiveSessionUseCase } from '@session/application/commands/use-cases/create-active-session/create-active-session.use-case';
import { CreateInvalidSessionUseCase } from '@session/application/commands/use-cases/create-invalid-session/create-invalid-session.use-case';
import { CreateSessionUseCase } from '@session/application/use-cases/commands/create-session/create-session.use-case';
import { IncrementFailedAttemptsSessionUseCase } from '@session/application/use-cases/commands/increment-failed-attempts-session/increment-failed-attempts-session.use-case';
import { CloseActiveSessionUseCase } from '@session/application/use-cases/commands/transition-status-session/from-active/close-active-session/close-active-session.use-case';
import { ExpireActiveSessionUseCase } from '@session/application/use-cases/commands/transition-status-session/from-active/expire-active-session/expire-active-session.use-case';
import { InactivateActiveSessionUseCase } from '@session/application/use-cases/commands/transition-status-session/from-active/inactivate-active-session/inactivate-active-session.use-case';
import { SuspendActiveSessionUseCase } from '@session/application/use-cases/commands/transition-status-session/from-active/suspend-active-session/suspend-active-session.use-case';
import { ActivateInactiveSessionUseCase } from '@session/application/use-cases/commands/transition-status-session/from-inactive/activate-inactive-session/activate-inactive-session.use-case';
import { CloseInactiveSessionUseCase } from '@session/application/use-cases/commands/transition-status-session/from-inactive/close-inactive-session/close-inactive-session.use-case';
import { ExpireInactiveSessionUseCase } from '@session/application/use-cases/commands/transition-status-session/from-inactive/expire-inactive-session/expire-inactive-session.use-case';
import { SuspendInactiveSessionUseCase } from '@session/application/use-cases/commands/transition-status-session/from-inactive/suspend-inactive-session/suspend-inactive-session.use-case';
import { ActiveInvalidSessionUseCase } from '@session/application/use-cases/commands/transition-status-session/from-invalid/activate-invalid-session/activate-invalid-session.use-case';
import { ActivatePendingSessionUseCase } from '@session/application/use-cases/commands/transition-status-session/from-pending/activate-pending-session/activate-pending-session.use-case';
import { GetSessionUseCase } from '@session/application/use-cases/queries/get-session/get-session.use-case';
import { SESSION_REPOSITORY } from '@session/domain/constants/injection-tokens';
import { ActivateInvalidSessionDomainService } from '@session/domain/domain-services/activate-invalid-session.domain-service';
import { CreateActiveSessionDomainService } from '@session/domain/domain-services/create-session-active.domain-service';
import { CreateInvalidSessionDomainService } from '@session/domain/domain-services/create-session-invalid.domain-service';
import { CreateSessionDomainService } from '@session/domain/domain-services/create-session.domain-service';
import { GetSessionDomainService } from '@session/domain/domain-services/get-session.domain-service';
import { IncrementFailedAttemptsSessionDomainService } from '@session/domain/domain-services/increment-failed-attempts-session.domain-service';
import { TransitionStatusSessionDomainService } from '@session/domain/domain-services/transition-status-session.domain-service';
import { CreateActiveSessionController } from '@session/infrastructure/controllers/commands/create-active-session/create-active-session.controller';
import { CreateInvalidSessionController } from '@session/infrastructure/controllers/commands/create-invalid-session/create-invalid-session.controller';
import { DestroySessionController } from '@session/infrastructure/controllers/commands/destroy-session/destroy-session.controller';
import { IncrementFailedAttemptsSessionController } from '@session/infrastructure/controllers/commands/increment-failed-attempts-session/increment-failed-attempts-session.controller';
import { ActivateInvalidSessionController } from '@session/infrastructure/controllers/commands/transition-status-session/activate-invalid-session/activate-invalid-session.controller';
import { TransitionDynamicStatusSessionController } from '@session/infrastructure/controllers/commands/transition-status-session/transition-dynamic-status-session/transition-dynamic-status-session.controller';
import { SessionEntity } from '@session/infrastructure/persistence/typeorm/entities/session.entity';
import { SessionTypeormRepository } from '@session/infrastructure/persistence/typeorm/repositories/session-typeorm.repository';
import { ACCOUNT_REPOSITORY } from '@user/domain/constants/injection-tokens';
import { UserModule } from '@user/infrastructure/framework/user.module';
import { AccountTypeormRepository } from '@user/infrastructure/persistence/typeorm/repositories/account-typeorm.repository';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([SessionEntity]), CqrsModule],
  providers: [
    // UseCases
    CreateSessionUseCase,
    ActiveInvalidSessionUseCase,
    CloseActiveSessionUseCase,
    ExpireActiveSessionUseCase,
    InactivateActiveSessionUseCase,
    SuspendActiveSessionUseCase,
    ActivateInactiveSessionUseCase,
    CloseInactiveSessionUseCase,
    ExpireInactiveSessionUseCase,
    SuspendInactiveSessionUseCase,
    ActivatePendingSessionUseCase,
    IncrementFailedAttemptsSessionUseCase,
    CreateInvalidSessionUseCase,
    CreateActiveSessionUseCase,
    // UpdateSessionUseCase,
    // ArchiveSessionUseCase,
    // DestroySessionUseCase,
    GetSessionUseCase,
    // ListSessionsUseCase,

    // Domain Services
    CreateSessionDomainService,
    ActivateInvalidSessionDomainService,
    TransitionStatusSessionDomainService,
    IncrementFailedAttemptsSessionDomainService,
    CreateInvalidSessionDomainService,
    CreateActiveSessionDomainService,
    // UpdateSessionDomainService,
    // ArchiveSessionDomainService,
    // DestroySessionDomainService,
    GetSessionDomainService,
    // ListSessionsDomainService,
    // Inversion of dependencies, Control principle (IoC) to domain services
    {
      provide: CreateSessionDomainService,
      useFactory: (accountRepository: AccountTypeormRepository): CreateSessionDomainService =>
        new CreateSessionDomainService(accountRepository),
      inject: [ACCOUNT_REPOSITORY],
    },
    {
      provide: ActivateInvalidSessionDomainService,
      useFactory: (
        sessionRepository: SessionTypeormRepository,
      ): ActivateInvalidSessionDomainService =>
        new ActivateInvalidSessionDomainService(sessionRepository),
      inject: [SESSION_REPOSITORY],
    },
    {
      provide: TransitionStatusSessionDomainService,
      useFactory: (
        sessionRepository: SessionTypeormRepository,
      ): TransitionStatusSessionDomainService =>
        new TransitionStatusSessionDomainService(sessionRepository),
      inject: [SESSION_REPOSITORY],
    },
    {
      provide: GetSessionDomainService,
      useFactory: (sessionRepository: SessionTypeormRepository): GetSessionDomainService =>
        new GetSessionDomainService(sessionRepository),
      inject: [SESSION_REPOSITORY],
    },
    {
      provide: IncrementFailedAttemptsSessionDomainService,
      useFactory: (
        sessionRepository: SessionTypeormRepository,
      ): IncrementFailedAttemptsSessionDomainService =>
        new IncrementFailedAttemptsSessionDomainService(sessionRepository),
      inject: [SESSION_REPOSITORY],
    },
    {
      provide: CreateInvalidSessionDomainService,
      useFactory: (
        accountRepository: AccountTypeormRepository,
      ): CreateInvalidSessionDomainService =>
        new CreateInvalidSessionDomainService(accountRepository),
      inject: [ACCOUNT_REPOSITORY],
    },
    {
      provide: CreateActiveSessionDomainService,
      useFactory: (accountRepository: AccountTypeormRepository): CreateActiveSessionDomainService =>
        new CreateActiveSessionDomainService(accountRepository),
      inject: [ACCOUNT_REPOSITORY],
    },
    {
      provide: SESSION_REPOSITORY,
      useClass: SessionTypeormRepository,
    },
  ],
  controllers: [
    ActivateInvalidSessionController,
    TransitionDynamicStatusSessionController,
    IncrementFailedAttemptsSessionController,
    CreateActiveSessionController,
    CreateInvalidSessionController,
    DestroySessionController,
  ],
})
export class SessionModule {}
