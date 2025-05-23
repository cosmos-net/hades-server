import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MediatorStoreService } from '@common/infrastructure/services/mediator-store-service/mediator-store.service';
import { ArchiveUserUseCase } from '@user/application/use-cases/commands/archive-user/archive-user.use-case';
import { CreateUserUseCase } from '@user/application/use-cases/commands/create-user/create-user.use-case';
import { DestroyUserUseCase } from '@user/application/use-cases/commands/destroy-user/destroy-user.use-case';
import { UpdateUserUseCase } from '@user/application/use-cases/commands/update-user/update-user.use-case';
import { GetAccountUseCase } from '@user/application/use-cases/queries/get-account/get-account.use-case';
import { GetUserUseCase } from '@user/application/use-cases/queries/get-user/get-user.use-case';
import { GetUserAggregateUseCase } from '@user/application/use-cases/queries/get-user-aggregate/get-user-aggregate.use-case';
import { ListUserUseCase } from '@user/application/use-cases/queries/list-user/list-user.use-case';
import { SearchAccountByEmailUseCase } from '@user/application/use-cases/queries/search-account-by-email/search-account-by-email.use-case';
import { SearchAccountByUsernameUseCase } from '@user/application/use-cases/queries/search-account-by-username/search-account-by-username.use-case';
import {
  ACCOUNT_REPOSITORY,
  PROFILE_REPOSITORY,
  USER_REPOSITORY,
} from '@user/domain/constants/injection-tokens';
import { ArchiveUserDomainService } from '@user/domain/domain-services/archive-user.domain-service';
import { CreateUserDomainService } from '@user/domain/domain-services/create-user.domain-service';
import { DestroyUserDomainService } from '@user/domain/domain-services/destroy-user.domain-service';
import { GetAccountDomainService } from '@user/domain/domain-services/get-account.domain-service';
import { GetUserAggregateDomainService } from '@user/domain/domain-services/get-user-aggregate.domain-service';
import { GetUserDomainService } from '@user/domain/domain-services/get-user.domain-service';
import { ListUserDomainService } from '@user/domain/domain-services/list-user.domain-service';
import { SearchAccountByEmailDomainService } from '@user/domain/domain-services/search-account-by-email.domain-service';
import { SearchAccountByUsernameDomainService } from '@user/domain/domain-services/search-account-by-username.domain-service';
import { UpdateUserDomainService } from '@user/domain/domain-services/update-user.domain-service';
import { ArchiveUserController } from '@user/infrastructure/controllers/commands/archive-user/archive-user.controller';
import { CreateUserController } from '@user/infrastructure/controllers/commands/create-user/create-user.controller';
import { DestroyUserController } from '@user/infrastructure/controllers/commands/destroy-user/destroy-user.controller';
import { UpdateUserController } from '@user/infrastructure/controllers/commands/update-user/update-user.controller';
import { GetUserController } from '@user/infrastructure/controllers/queries/get-user/get-user.controller';
import { ListUserController } from '@user/infrastructure/controllers/queries/list-user/list-user.controller';
import { SearchAccountByEmailController } from '@user/infrastructure/controllers/queries/search-account-by-email/search-account-by-email.controller';
import { SearchAccountByUsernameController } from '@user/infrastructure/controllers/queries/search-account-by-username/search-account-by-username.controller';
import { UserArchivedEventHandler } from '@user/infrastructure/event-handlers/success/user-archived.event-handler';
import { AccountEntity } from '@user/infrastructure/persistence/typeorm/entities/account.entity';
import { ProfileEntity } from '@user/infrastructure/persistence/typeorm/entities/profile.entity';
import { UserEntity } from '@user/infrastructure/persistence/typeorm/entities/user.entity';
import { AccountTypeormRepository } from '@user/infrastructure/persistence/typeorm/repositories/account-typeorm.repository';
import { ProfileTypeormRepository } from '@user/infrastructure/persistence/typeorm/repositories/profile-typeorm.repository';
import { UserTypeormRepository } from '@user/infrastructure/persistence/typeorm/repositories/user-typeorm.repository';
import { AccountFacadeService } from '@user/infrastructure/services/facade/account-facade.service';
import { UserAggregateFacadeService } from '@user/infrastructure/services/facade/user-aggregate-facade.service';
import { UserFacadeService } from '@user/infrastructure/services/facade/user-facade.service';
@Module({
  imports: [
    CqrsModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([UserEntity, AccountEntity, ProfileEntity]),
  ],
  providers: [
    // UseCases
    CreateUserUseCase,
    UpdateUserUseCase,
    ArchiveUserUseCase,
    DestroyUserUseCase,
    GetUserAggregateUseCase,
    ListUserUseCase,
    GetAccountUseCase,
    GetUserUseCase,
    SearchAccountByEmailUseCase,
    SearchAccountByUsernameUseCase,
    // Domain Services
    CreateUserDomainService,
    UpdateUserDomainService,
    ArchiveUserDomainService,
    DestroyUserDomainService,
    GetUserAggregateDomainService,
    ListUserDomainService,
    GetAccountDomainService,
    GetUserDomainService,
    SearchAccountByEmailDomainService,
    SearchAccountByUsernameDomainService,
    // Inversion of dependencies, Control principle (IoC) to domain services
    {
      provide: CreateUserDomainService,
      useFactory: (
        accountRepository: AccountTypeormRepository,
        profileRepository: ProfileTypeormRepository,
      ): CreateUserDomainService => {
        return new CreateUserDomainService(accountRepository, profileRepository);
      },
      inject: [ACCOUNT_REPOSITORY, PROFILE_REPOSITORY],
    },
    {
      provide: UpdateUserDomainService,
      useFactory: (
        userRepository: UserTypeormRepository,
        accountRepository: AccountTypeormRepository,
        profileRepository: ProfileTypeormRepository,
      ): UpdateUserDomainService => {
        return new UpdateUserDomainService(userRepository, accountRepository, profileRepository);
      },
      inject: [USER_REPOSITORY, ACCOUNT_REPOSITORY, PROFILE_REPOSITORY],
    },
    {
      provide: ArchiveUserDomainService,
      useFactory: (userRepository: UserTypeormRepository): ArchiveUserDomainService => {
        return new ArchiveUserDomainService(userRepository);
      },
      inject: [USER_REPOSITORY],
    },
    {
      provide: DestroyUserDomainService,
      useFactory: (userRepository: UserTypeormRepository): DestroyUserDomainService => {
        return new DestroyUserDomainService(userRepository);
      },
      inject: [USER_REPOSITORY],
    },
    {
      provide: GetUserAggregateDomainService,
      useFactory: (userRepository: UserTypeormRepository): GetUserAggregateDomainService => {
        return new GetUserAggregateDomainService(userRepository);
      },
      inject: [USER_REPOSITORY],
    },
    {
      provide: ListUserDomainService,
      useFactory: (userRepository: UserTypeormRepository): ListUserDomainService => {
        return new ListUserDomainService(userRepository);
      },
      inject: [USER_REPOSITORY],
    },
    {
      provide: GetAccountDomainService,
      useFactory: (accountRepository: AccountTypeormRepository): GetAccountDomainService => {
        return new GetAccountDomainService(accountRepository);
      },
      inject: [ACCOUNT_REPOSITORY],
    },
    {
      provide: GetUserDomainService,
      useFactory: (userRepository: UserTypeormRepository): GetUserDomainService => {
        return new GetUserDomainService(userRepository);
      },
      inject: [USER_REPOSITORY],
    },
    {
      provide: SearchAccountByEmailDomainService,
      useFactory: (
        accountRepository: AccountTypeormRepository,
      ): SearchAccountByEmailDomainService => {
        return new SearchAccountByEmailDomainService(accountRepository);
      },
      inject: [ACCOUNT_REPOSITORY],
    },
    {
      provide: SearchAccountByUsernameDomainService,
      useFactory: (
        accountRepository: AccountTypeormRepository,
      ): SearchAccountByUsernameDomainService => {
        return new SearchAccountByUsernameDomainService(accountRepository);
      },
      inject: [ACCOUNT_REPOSITORY],
    },
    // Event Handlers
    UserArchivedEventHandler,
    // Services
    MediatorStoreService,
    UserAggregateFacadeService,
    UserFacadeService,
    AccountFacadeService,
    // Repositories
    {
      provide: USER_REPOSITORY,
      useClass: UserTypeormRepository,
    },
    {
      provide: ACCOUNT_REPOSITORY,
      useClass: AccountTypeormRepository,
    },
    {
      provide: PROFILE_REPOSITORY,
      useClass: ProfileTypeormRepository,
    },
  ],
  controllers: [
    CreateUserController,
    UpdateUserController,
    ArchiveUserController,
    DestroyUserController,
    GetUserController,
    ListUserController,
    SearchAccountByEmailController,
    SearchAccountByUsernameController,
  ],
  exports: [
    ACCOUNT_REPOSITORY,
    UserAggregateFacadeService,
    UserFacadeService,
    AccountFacadeService,
  ],
})
export class UserModule {}
