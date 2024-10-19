import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateRoleController } from '@role/infrastructure/controllers/commands/create-role/create-role.controller';
import { RoleReDescribeEventHandler } from '@role/infrastructure/events/role-created.event-handler';
import { RoleEntity } from '@role/infrastructure/persistence/entities/role.entity';
import { RoleTypeormRepository } from '@role/infrastructure/persistence/repositories/role-typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]), CqrsModule],
  controllers: [CreateRoleController],
  providers: [RoleTypeormRepository, RoleReDescribeEventHandler],
})
export class RoleModule {}
