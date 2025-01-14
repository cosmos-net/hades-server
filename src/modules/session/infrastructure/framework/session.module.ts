import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActiveInvalidSessionUseCase } from '@session/application/commands/use-cases/activate-invalid-session/activate-invalid-session.use-case';
import { CreateSessionUseCase } from '@session/application/commands/use-cases/create-session/create-session.use-case';
import { SESSION_REPOSITORY } from '@session/domain/constants/injection-tokens';
import { ActivateInvalidSessionDomainService } from '@session/domain/domain-services/activate-invalid-session.domain-service';
import { CreateSessionDomainService } from '@session/domain/domain-services/create-session.domain-service';
import { ActivateInvalidSessionController } from '@session/infrastructure/controllers/commands/activate-invalid-session/activate-invalid-session.controller';
import { CreateSessionController } from '@session/infrastructure/controllers/commands/create-session/create-session.controller';
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
    // UpdateSessionUseCase,
    // ArchiveSessionUseCase,
    // DestroySessionUseCase,
    // GetSessionUseCase,
    // ListSessionsUseCase,

    // Domain Services
    CreateSessionDomainService,
    ActivateInvalidSessionDomainService,
    // UpdateSessionDomainService,
    // ArchiveSessionDomainService,
    // DestroySessionDomainService,
    // GetSessionDomainService,
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
      provide: SESSION_REPOSITORY,
      useClass: SessionTypeormRepository,
    },
  ],
  controllers: [CreateSessionController, ActivateInvalidSessionController],
})
export class SessionModule {}
