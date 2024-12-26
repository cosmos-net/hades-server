import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArchiveUserUseCase } from '@user/application/commands/use-cases/archive-user/archive-user.use-case';
import { CreateUserUseCase } from '@user/application/commands/use-cases/create-user/create-user.use-case';
import { DestroyUserUseCase } from '@user/application/commands/use-cases/destroy-user/destroy-user.use-case';
import { UpdateUserUseCase } from '@user/application/commands/use-cases/update-user/update-user.use-case';
import { GetUserUseCase } from '@user/application/queries/use-cases/get-user/get-user.use-case';
import { ListUserUseCase } from '@user/application/queries/use-cases/list-user/list-user.use-case';
import { USER_REPOSITORY } from '@user/domain/constants/injection-tokens';
import { ArchiveUserDomainService } from '@user/domain/domain-services/archive-user.domain-service';
import { CreateUserDomainService } from '@user/domain/domain-services/create-user.domain-service';
import { DestroyUserDomainService } from '@user/domain/domain-services/destroy-user.domain-service';
import { GetUserDomainService } from '@user/domain/domain-services/get-user.domain-service';
import { ListUserDomainService } from '@user/domain/domain-services/list-user.domain-service';
import { UpdateUserDomainService } from '@user/domain/domain-services/update-user.domain-service';
import { ArchiveUserController } from '@user/infrastructure/controllers/user/commands/archive-user/archive-user.controller';
import { CreateUserController } from '@user/infrastructure/controllers/user/commands/create-user/create-user.controller';
import { DestroyUserController } from '@user/infrastructure/controllers/user/commands/destroy-user/destroy-user.controller';
import { UpdateUserController } from '@user/infrastructure/controllers/user/commands/update-user/update-user.controller';
import { GetUserController } from '@user/infrastructure/controllers/user/queries/get-user/get-user.controller';
import { ListUserController } from '@user/infrastructure/controllers/user/queries/list-user/list-user.controller';
import { AccountEntity } from '@user/infrastructure/persistence/typeorm/entities/account.entity';
import { ProfileEntity } from '@user/infrastructure/persistence/typeorm/entities/profile.entity';
import { SessionEntity } from '@session/infrastructure/persistence/typeorm/entities/session.entity';
import { UserEntity } from '@user/infrastructure/persistence/typeorm/entities/user.entity';
import { UserTypeormRepository } from '@user/infrastructure/persistence/typeorm/repositories/user-typeorm.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AccountEntity, ProfileEntity, SessionEntity]),
    CqrsModule,
  ],
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
    // Event Handlers
    // Repositories
    {
      provide: USER_REPOSITORY,
      useClass: UserTypeormRepository,
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
  exports: [],
})
export class UserModule {}