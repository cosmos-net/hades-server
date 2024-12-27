import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

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
import { SessionEntity } from '@user/infrastructure/persistence/typeorm/entities/session.entity';
import { UserEntity } from '@user/infrastructure/persistence/typeorm/entities/user.entity';
import { UserTypeormRepository } from '@user/infrastructure/persistence/typeorm/repositories/user-typeorm.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AccountEntity, ProfileEntity, SessionEntity]),
    CqrsModule,
  ],
  controllers: [
    CreateUserController,
    UpdateUserController,
    ArchiveUserController,
    DestroyUserController,
    GetUserController,
    ListUserController,
  ],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserTypeormRepository,
    },
    {
      provide: CreateUserDomainService.name,
      useFactory: (userRepository: UserTypeormRepository): CreateUserDomainService => {
        return new CreateUserDomainService(userRepository);
      },
      inject: [UserTypeormRepository],
    },
    {
      provide: UpdateUserDomainService.name,
      useFactory: (userRepository: UserTypeormRepository): UpdateUserDomainService => {
        return new UpdateUserDomainService(userRepository);
      },
      inject: [UserTypeormRepository],
    },
    {
      provide: ArchiveUserDomainService.name,
      useFactory: (userRepository: UserTypeormRepository): ArchiveUserDomainService => {
        return new ArchiveUserDomainService(userRepository);
      },
      inject: [UserTypeormRepository],
    },
    {
      provide: DestroyUserDomainService.name,
      useFactory: (userRepository: UserTypeormRepository): DestroyUserDomainService => {
        return new DestroyUserDomainService(userRepository);
      },
      inject: [UserTypeormRepository],
    },
    {
      provide: GetUserDomainService.name,
      useFactory: (userRepository: UserTypeormRepository): GetUserDomainService => {
        return new GetUserDomainService(userRepository);
      },
      inject: [UserTypeormRepository],
    },
    {
      provide: ListUserDomainService.name,
      useFactory: (userRepository: UserTypeormRepository): ListUserDomainService => {
        return new ListUserDomainService(userRepository);
      },
      inject: [UserTypeormRepository],
    },
  ],
  exports: [],
})
export class UserModule {}
