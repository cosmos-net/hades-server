import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActiveInvalidSessionUseCase } from '@session/application/commands/use-cases/activate-invalid-session/activate-invalid-session.use-case';
import { CreateActiveSessionUseCase } from '@session/application/commands/use-cases/create-active-session/create-active-session.use-case';
import { SESSION_REPOSITORY } from '@session/domain/constants/injection-tokens';
import { ActivateInvalidSessionDomainService } from '@session/domain/domain-services/activate-invalid-session.domain-service';
import { CreateActiveSessionDomainService } from '@session/domain/domain-services/create-session-active.domain-service';
import { ActivateInvalidSessionController } from '@session/infrastructure/controllers/commands/activate-invalid-session/activate-invalid-session.controller';
import { CreateActiveSessionController } from '@session/infrastructure/controllers/commands/create-session/create-active-session.controller';
import { SessionEntity } from '@session/infrastructure/persistence/typeorm/entities/session.entity';
import { SessionTypeormRepository } from '@session/infrastructure/persistence/typeorm/repositories/session-typeorm.repository';
import { ACCOUNT_REPOSITORY } from '@user/domain/constants/injection-tokens';
import { UserModule } from '@user/infrastructure/framework/user.module';
import { AccountTypeormRepository } from '@user/infrastructure/persistence/typeorm/repositories/account-typeorm.repository';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([SessionEntity]), CqrsModule],
  providers: [
    // UseCases
    CreateActiveSessionUseCase,
    ActiveInvalidSessionUseCase,
    // UpdateSessionUseCase,
    // ArchiveSessionUseCase,
    // DestroySessionUseCase,
    // GetSessionUseCase,
    // ListSessionsUseCase,

    // Domain Services
    CreateActiveSessionDomainService,
    ActivateInvalidSessionDomainService,
    // UpdateSessionDomainService,
    // ArchiveSessionDomainService,
    // DestroySessionDomainService,
    // GetSessionDomainService,
    // ListSessionsDomainService,
    // Inversion of dependencies, Control principle (IoC) to domain services
    {
      provide: CreateActiveSessionDomainService,
      useFactory: (accountRepository: AccountTypeormRepository): CreateActiveSessionDomainService =>
        new CreateActiveSessionDomainService(accountRepository),
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
      provide: SESSION_REPOSITORY,
      useClass: SessionTypeormRepository,
    },
  ],
  controllers: [CreateActiveSessionController, ActivateInvalidSessionController],
})
export class SessionModule {}
