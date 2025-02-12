import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArchivePermissionUseCase } from '@permission/application/use-cases/commands/archive-permission/archive-permission.use-case';
import { CreatePermissionUseCase } from '@permission/application/use-cases/commands/create-permission/create-permission.use-case';
import { DestroyPermissionUseCase } from '@permission/application/use-cases/commands/destroy-permission/destroy-permission.use-case';
import { UnarchivePermissionUseCase } from '@permission/application/use-cases/commands/unarchive-permission/unarchive-permission.use-case';
import { UpdatePermissionUseCase } from '@permission/application/use-cases/commands/update-permission/update-permission.use-case';
import { GetPermissionUseCase } from '@permission/application/use-cases/queries/get-permission/get-permission.use-case';
import { ListPermissionUseCase } from '@permission/application/use-cases/queries/list-permission/list-permission.use-case';
import { PERMISSION_REPOSITORY } from '@permission/domain/constants/permission-injection-tokens.constants';
import { ArchivePermissionDomainService } from '@permission/domain/domain-services/archive-permission.domain-service';
import { CreatePermissionDomainService } from '@permission/domain/domain-services/create-permission.domain-service';
import { DestroyPermissionDomainService } from '@permission/domain/domain-services/destroy-permission.domain-service';
import { GetPermissionDomainService } from '@permission/domain/domain-services/get-permission.domain-service';
import { ListPermissionDomainService } from '@permission/domain/domain-services/list-permission.domain-service';
import { UnarchivePermissionDomainService } from '@permission/domain/domain-services/unarchive-permission.domain-service';
import { UpdatePermissionDomainService } from '@permission/domain/domain-services/update-permission.domain-service';
import { ArchivePermissionController } from '@permission/infrastructure/controllers/commands/archive-permission/archive-permission.controller';
import { CreatePermissionController } from '@permission/infrastructure/controllers/commands/create-permission/create-permission-controller';
import { DestroyPermissionController } from '@permission/infrastructure/controllers/commands/destroy-permission/destroy-permission.controller';
import { UnarchivePermissionController } from '@permission/infrastructure/controllers/commands/unarchive-permission/unarchive-permission.controller';
import { UpdatePermissionController } from '@permission/infrastructure/controllers/commands/update-permission/update-permission.controller';
import { GetPermissionController } from '@permission/infrastructure/controllers/queries/get-permission/get-permission.controller';
import { ListPermissionController } from '@permission/infrastructure/controllers/queries/list-permission/list-permission.controller';
import { PermissionEntity } from '@permission/infrastructure/persistence/typeorm/entities/permission.entity';
import { PermissionTypeormRepository } from '@permission/infrastructure/persistence/typeorm/repositories/permission-typeorm.repository';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PermissionEntity])],
  providers: [
    // UseCases
    CreatePermissionUseCase,
    UpdatePermissionUseCase,
    ArchivePermissionUseCase,
    UnarchivePermissionUseCase,
    DestroyPermissionUseCase,
    GetPermissionUseCase,
    ListPermissionUseCase,
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
    {
      provide: UnarchivePermissionDomainService,
      useFactory: (
        permissionRepository: PermissionTypeormRepository,
      ): UnarchivePermissionDomainService => {
        return new UnarchivePermissionDomainService(permissionRepository);
      },
      inject: [PERMISSION_REPOSITORY],
    },
    ListPermissionDomainService,
    {
      provide: ListPermissionDomainService,
      useFactory: (
        permissionRepository: PermissionTypeormRepository,
      ): ListPermissionDomainService => {
        return new ListPermissionDomainService(permissionRepository);
      },
      inject: [PERMISSION_REPOSITORY],
    },
    // Services
    // Repositories
    {
      provide: PERMISSION_REPOSITORY,
      useClass: PermissionTypeormRepository,
    },
    ArchivePermissionDomainService,
    {
      provide: ArchivePermissionDomainService,
      useFactory: (
        permissionRepository: PermissionTypeormRepository,
      ): ArchivePermissionDomainService => {
        return new ArchivePermissionDomainService(permissionRepository);
      },
      inject: [PERMISSION_REPOSITORY],
    },
    DestroyPermissionDomainService,
    {
      provide: DestroyPermissionDomainService,
      useFactory: (
        permissionRepository: PermissionTypeormRepository,
      ): DestroyPermissionDomainService => {
        return new DestroyPermissionDomainService(permissionRepository);
      },
      inject: [PERMISSION_REPOSITORY],
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
    ArchivePermissionController,
    UnarchivePermissionController,
    DestroyPermissionController,
    GetPermissionController,
    ListPermissionController,
  ],
  exports: [],
})
export class PermissionModule {}
