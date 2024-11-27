import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArchiveUserController } from '@user/infrastructure/controllers/user/commands/archive-user/archive-user.controller';
import { CreateUserController } from '@user/infrastructure/controllers/user/commands/create-user/create-user.controller';
import { DestroyUserController } from '@user/infrastructure/controllers/user/commands/destroy-user/destroy-user.controller';
import { UpdateUserController } from '@user/infrastructure/controllers/user/commands/update-user/update-user.controller';
import { GetUserController } from '@user/infrastructure/controllers/user/queries/get-user/get-user.controller';
import { ListUserController } from '@user/infrastructure/controllers/user/queries/list-user/list-user.controller';
import { AccountEntity } from '@user/infrastructure/persistence/typeorm/entities/account.entity';
import { ProfileEntity } from '@user/infrastructure/persistence/typeorm/entities/profile.entity';
import { UserEntity } from '@user/infrastructure/persistence/typeorm/entities/user.entity';

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
  providers: [],
  exports: [],
})
export class RoleModule {}
