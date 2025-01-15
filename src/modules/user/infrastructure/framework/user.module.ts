import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArchiveUserUseCase } from '@user/application/commands/use-cases/archive-user/archive-user.use-case';
import { CreateUserUseCase } from '@user/application/commands/use-cases/create-user/create-user.use-case';
import { DestroyUserUseCase } from '@user/application/commands/use-cases/destroy-user/destroy-user.use-case';
import { UpdateUserUseCase } from '@user/application/commands/use-cases/update-user/update-user.use-case';
import { GetUserUseCase } from '@user/application/queries/use-cases/get-user/get-user.use-case';
import { ListUserUseCase } from '@user/application/queries/use-cases/list-user/list-user.use-case';
import {
  ACCOUNT_REPOSITORY,
  PROFILE_REPOSITORY,
  USER_REPOSITORY,
} from '@user/domain/constants/injection-tokens';
import { ArchiveUserDomainService } from '@user/domain/domain-services/archive-user.domain-service';
import { CreateUserDomainService } from '@user/domain/domain-services/create-user.domain-service';
import { DestroyUserDomainService } from '@user/domain/domain-services/destroy-user.domain-service';
import { GetUserDomainService } from '@user/domain/domain-services/get-user.domain-service';
import { ListUserDomainService } from '@user/domain/domain-services/list-user.domain-service';
import { UpdateUserDomainService } from '@user/domain/domain-services/update-user.domain-service';
import { ArchiveUserController } from '@user/infrastructure/controllers/commands/archive-user/archive-user.controller';
import { CreateUserController } from '@user/infrastructure/controllers/commands/create-user/create-user.controller';
import { DestroyUserController } from '@user/infrastructure/controllers/commands/destroy-user/destroy-user.controller';
import { UpdateUserController } from '@user/infrastructure/controllers/commands/update-user/update-user.controller';
import { GetUserController } from '@user/infrastructure/controllers/queries/get-user/get-user.controller';
import { ListUserController } from '@user/infrastructure/controllers/queries/list-user/list-user.controller';
import { AccountEntity } from '@user/infrastructure/persistence/typeorm/entities/account.entity';
import { ProfileEntity } from '@user/infrastructure/persistence/typeorm/entities/profile.entity';
import { UserEntity } from '@user/infrastructure/persistence/typeorm/entities/user.entity';
import { AccountTypeormRepository } from '@user/infrastructure/persistence/typeorm/repositories/account-typeorm.repository';
import { ProfileTypeormRepository } from '@user/infrastructure/persistence/typeorm/repositories/profile-typeorm.repository';
import { UserTypeormRepository } from '@user/infrastructure/persistence/typeorm/repositories/user-typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AccountEntity, ProfileEntity]), CqrsModule],
  providers: [
    // UseCases
    CreateUserUseCase,
    UpdateUserUseCase,
    ArchiveUserUseCase,
    DestroyUserUseCase,
    GetUserUseCase,
    ListUserUseCase,
    // Domain Services
    CreateUserDomainService,
    UpdateUserDomainService,
    ArchiveUserDomainService,
    DestroyUserDomainService,
    GetUserDomainService,
    ListUserDomainService,
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
      provide: GetUserDomainService,
      useFactory: (userRepository: UserTypeormRepository): GetUserDomainService => {
        return new GetUserDomainService(userRepository);
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
    // Event Handlers
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
  ],
  exports: [ACCOUNT_REPOSITORY], // Exporta ACCOUNT_REPOSITORY
})
export class UserModule {}
