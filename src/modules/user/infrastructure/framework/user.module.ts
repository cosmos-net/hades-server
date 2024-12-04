import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { USER_REPOSITORY } from '@user/domain/constants/injection-tokens';
import { ArchiveUserController } from '@user/infrastructure/controllers/user/commands/archive-user/archive-user.controller';
import { CreateUserController } from '@user/infrastructure/controllers/user/commands/create-user/create-user.controller';
import { DestroyUserController } from '@user/infrastructure/controllers/user/commands/destroy-user/destroy-user.controller';
import { UpdateUserController } from '@user/infrastructure/controllers/user/commands/update-user/update-user.controller';
import { GetUserController } from '@user/infrastructure/controllers/user/queries/get-user/get-user.controller';
import { ListUserController } from '@user/infrastructure/controllers/user/queries/list-user/list-user.controller';
import { AccountEntity } from '@user/infrastructure/persistence/typeorm/entities/account.entity';
import { ProfileEntity } from '@user/infrastructure/persistence/typeorm/entities/profile.entity';
import { UserEntity } from '@user/infrastructure/persistence/typeorm/entities/user.entity';
import { UserTypeormRepository } from '@user/infrastructure/persistence/typeorm/repositories/user-typeorm.repository';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AccountEntity, ProfileEntity]), CqrsModule],
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
      useFactory: (userRepository: UserTypeormRepository) => {
        return new CreateUserDomainService(userRepository);
      },
      inject: [UserTypeormRepository],
    },
    {
      provide: UpdateUserDomainService.name,
      useFactory: (userRepository: UserTypeormRepository) => {
        return new UpdateUserDomainService(userRepository);
      },
      inject: [UserTypeormRepository],
    },
    {
      provide: ArchiveUserDomainService.name,
      useFactory: (userRepository: UserTypeormRepository) => {
        return new ArchiveUserDomainService(userRepository);
      },
      inject: [UserTypeormRepository],
    },
    {
      provide: DestroyUserDomainService.name,
      useFactory: (userRepository: UserTypeormRepository) => {
        return new DestroyUserDomainService(userRepository);
      },
      inject: [UserTypeormRepository],
    },
    {
      provide: GetUserDomainService.name,
      useFactory: (userRepository: UserTypeormRepository) => {
        return new GetUserDomainService(userRepository);
      },
      inject: [UserTypeormRepository],
    },
    {
      provide: ListUserDomainService.name,
      useFactory: (userRepository: UserTypeormRepository) => {
        return new ListUserDomainService(userRepository);
      },
      inject: [UserTypeormRepository],
    },
  ],
  exports: [],
})
export class UserModule {}
