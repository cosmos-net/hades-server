import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermissionEntity } from '@permission/infrastructure/persistence/typeorm/entities/permission.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PermissionEntity])],
  providers: [
    // UseCases
    // Domain Services && Inversion of dependencies
    // Services
  ],
  controllers: [],
  exports: [],
})
export class PermissionModule {}
