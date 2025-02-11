import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreatePermissionUseCase } from '@permission/application/use-cases/commands/create-permission/create-permission.use-case';
import { UnarchivePermissionUseCase } from '@permission/application/use-cases/commands/unarchive-permission/unarchive-permission.use-case';
import { UpdatePermissionUseCase } from '@permission/application/use-cases/commands/update-permission/update-permission.use-case';
import { GetPermissionUseCase } from '@permission/application/use-cases/queries/get-permission/get-permission.use-case';
import { PERMISSION_REPOSITORY } from '@permission/domain/constants/permission-injection-tokens.constants';
import { CreatePermissionDomainService } from '@permission/domain/domain-services/create-permission.domain-service';
import { GetPermissionDomainService } from '@permission/domain/domain-services/get-permission.domain-service';
import { UnarchivePermissionDomainService } from '@permission/domain/domain-services/unarchive-permission.domain-service';
import { UpdatePermissionDomainService } from '@permission/domain/domain-services/update-permission.domain-service';
import { CreatePermissionController } from '@permission/infrastructure/controllers/commands/create-permission/create-permission-controller';
import { UnarchivePermissionController } from '@permission/infrastructure/controllers/commands/unarchive-permission/unarchive-permission.controller';
import { UpdatePermissionController } from '@permission/infrastructure/controllers/commands/update-permission/update-permission.controller';
import { GetPermissionController } from '@permission/infrastructure/controllers/queries/get-permission/get-permission.controller';
import { PermissionEntity } from '@permission/infrastructure/persistence/typeorm/entities/permission.entity';
import { PermissionTypeormRepository } from '@permission/infrastructure/persistence/typeorm/repositories/permission-typeorm.repository';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PermissionEntity])],
  providers: [
    // UseCases
    CreatePermissionUseCase,
    UpdatePermissionUseCase,
    UnarchivePermissionUseCase,
    GetPermissionUseCase,
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
    UnarchivePermissionDomainService,
    // Services
    // Repositories
    {
      provide: PERMISSION_REPOSITORY,
      useClass: PermissionTypeormRepository,
    },
    GetPermissionDomainService,
    {
      provide: GetPermissionDomainService,
      useFactory: (
        permissionRepository: PermissionTypeormRepository,
      ): GetPermissionDomainService => {
        return new GetPermissionDomainService(permissionRepository);
      },
      inject: [PERMISSION_REPOSITORY],
    },
  ],
  controllers: [
    CreatePermissionController,
    UpdatePermissionController,
    UnarchivePermissionController,
    GetPermissionController,
  ],
  exports: [],
})
export class PermissionModule {}
