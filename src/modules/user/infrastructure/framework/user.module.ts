import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArchiveUserController } from '@user/infrastructure/controllers/user/commands/archive-user/archive-user.controller';
import { CreateUserController } from '@user/infrastructure/controllers/user/commands/create-user/create-user.controller';
import { DestroyUserController } from '@user/infrastructure/controllers/user/commands/destroy-user/destroy-user.controller';
import { UpdateUserController } from '@user/infrastructure/controllers/user/commands/update-user/update-user.controller';
import { GetUserController } from '@user/infrastructure/controllers/user/queries/get-user/get-user.controller';
import { ListUserController } from '@user/infrastructure/controllers/user/queries/list-user/list-user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]), CqrsModule],
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
