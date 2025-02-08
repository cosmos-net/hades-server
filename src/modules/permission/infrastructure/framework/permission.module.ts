import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreatePermissionUseCase } from '@permission/application/use-cases/commands/create-permission/create-permission.use-case';
import { PERMISSION_REPOSITORY } from '@permission/domain/constants/permission-injection-tokens.constants';
import { CreatePermissionDomainService } from '@permission/domain/domain-services/create-permission.domain-service';
import { UpdatePermissionDomainService } from '@permission/domain/domain-services/update-permission.domain-service';
import { CreatePermissionController } from '@permission/infrastructure/controllers/commands/create-permission/create-permission-controller';
import { UpdatePermissionController } from '@permission/infrastructure/controllers/commands/update-permission/update-permission.controller';
import { PermissionEntity } from '@permission/infrastructure/persistence/typeorm/entities/permission.entity';
import { PermissionTypeormRepository } from '@permission/infrastructure/persistence/typeorm/repositories/permission-typeorm.repository';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PermissionEntity])],
  providers: [
    // UseCases
    CreatePermissionUseCase,
    UpdatePermissionController,
    // Domain Services && Inversion of dependencies
    CreatePermissionDomainService,
    {
      provide: CreatePermissionDomainService,
      useFactory: (
        permissionRepository: PermissionTypeormRepository,
      ): CreatePermissionDomainService => {
        return new CreatePermissionDomainService(permissionRepository);
      },
      inject: [PERMISSION_REPOSITORY],
    },
    UpdatePermissionDomainService,
    {
      provide: UpdatePermissionDomainService,
      useFactory: (
        permissionRepository: PermissionTypeormRepository,
      ): UpdatePermissionDomainService => {
        return new UpdatePermissionDomainService(permissionRepository);
      },
      inject: [PERMISSION_REPOSITORY],
    },
    // Services
    // Repositories
    {
      provide: PERMISSION_REPOSITORY,
      useClass: PermissionTypeormRepository,
    },
  ],
  controllers: [CreatePermissionController, UpdatePermissionController],
  exports: [],
})
export class PermissionModule {}
