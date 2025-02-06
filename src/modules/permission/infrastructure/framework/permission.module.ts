import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreatePermissionUseCase } from '@permission/application/use-cases/commands/create-permission/create-permission.use-case';
import { PERMISSION_REPOSITORY } from '@permission/domain/constants/permission-injection-tokens.constants';
import { CreatePermissionDomainService } from '@permission/domain/domain-services/create-permission.domain-service';
import { PermissionEntity } from '@permission/infrastructure/persistence/typeorm/entities/permission.entity';
import { PermissionTypeormRepository } from '@permission/infrastructure/persistence/typeorm/repositories/permission-typeorm.repository';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PermissionEntity])],
  providers: [
    // UseCases
    CreatePermissionUseCase,
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
    // Services
    // Repositories
    {
      provide: PERMISSION_REPOSITORY,
      useClass: PermissionTypeormRepository,
    },
  ],
  controllers: [CreatePermissionUseCase],
  exports: [],
})
export class PermissionModule {}
