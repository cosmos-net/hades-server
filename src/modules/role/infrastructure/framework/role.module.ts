import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MediatorStoreService } from '@common/infrastructure/services/mediator-store-service/mediator-store.service';
import { ArchiveRoleUseCase } from '@role/application/use-cases/commands/archive-role/archive-role.use-case';
import { CreateRoleUseCase } from '@role/application/use-cases/commands/create-role/create-role.use-case';
import { DestroyRoleUseCase } from '@role/application/use-cases/commands/destroy-role/destroy-role.use-case';
import { UpdateRoleUseCase } from '@role/application/use-cases/commands/update-role/update-role.use-case';
import { GetRoleUseCase } from '@role/application/use-cases/queries/get-role/get-role.use-case';
import { ListRoleUseCase } from '@role/application/use-cases/queries/list-role/list-role.use-case';
import { ROLE_REPOSITORY } from '@role/domain/constants/injection-tokens';
import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { ArchiveRoleDomainService } from '@role/domain/domain-service/archive-role.domain-service';
import { CreateRoleDomainService } from '@role/domain/domain-service/create-role.domain-service';
import { DestroyRoleDomainService } from '@role/domain/domain-service/destroy-role.domain-service';
import { GetRoleDomainService } from '@role/domain/domain-service/get-role.domain-service';
import { ListRoleDomainService } from '@role/domain/domain-service/list-role.domain-service';
import { UpdateRoleDomainService } from '@role/domain/domain-service/update-role.domain-service';
import { ArchiveRoleController } from '@role/infrastructure/controllers/commands/archive-role/archive-role.controller';
import { CreateRoleController } from '@role/infrastructure/controllers/commands/create-role/create-role.controller';
import { DestroyRoleController } from '@role/infrastructure/controllers/commands/destroy-role/destroy-role.controller';
import { UpdateRoleController } from '@role/infrastructure/controllers/commands/update-role/update-role.controller';
import { GetRoleController } from '@role/infrastructure/controllers/queries/get-role/get-role.controller';
import { ListRoleController } from '@role/infrastructure/controllers/queries/list-role/list-role.controller';
import { RoleArchivedEventHandler } from '@role/infrastructure/events-handler/success/role-archived.event-handler';
import { RoleReDescribedEventHandler } from '@role/infrastructure/events-handler/success/role-redescribed.event-handler';
import { RoleEntity } from '@role/infrastructure/persistence/typeorm/entities/role.entity';
import { RoleTypeormRepository } from '@role/infrastructure/persistence/typeorm/repositories/role-typeorm.repository';
import { RoleFacadeService } from '@role/infrastructure/services/facade/role-facade.service';

@Module({
  imports: [CqrsModule, EventEmitterModule.forRoot(), TypeOrmModule.forFeature([RoleEntity])],
  providers: [
    // UseCases
    CreateRoleUseCase,
    UpdateRoleUseCase,
    ArchiveRoleUseCase,
    DestroyRoleUseCase,
    GetRoleUseCase,
    ListRoleUseCase,
    // Domain Services
    CreateRoleDomainService,
    UpdateRoleDomainService,
    ArchiveRoleDomainService,
    DestroyRoleDomainService,
    GetRoleDomainService,
    ListRoleDomainService,
    // Inversion of dependencies, Control principle (IoC) to domain services
    {
      provide: CreateRoleDomainService,
      useFactory: (roleRepository: IRoleRepositoryContract): CreateRoleDomainService => {
        return new CreateRoleDomainService(roleRepository);
      },
      inject: [IRoleRepositoryContract],
    },
    {
      provide: UpdateRoleDomainService,
      useFactory: (roleRepository: IRoleRepositoryContract): UpdateRoleDomainService => {
        return new UpdateRoleDomainService(roleRepository);
      },
      inject: [IRoleRepositoryContract],
    },
    {
      provide: ArchiveRoleDomainService,
      useFactory: (roleRepository: IRoleRepositoryContract): ArchiveRoleDomainService => {
        return new ArchiveRoleDomainService(roleRepository);
      },
      inject: [IRoleRepositoryContract],
    },
    {
      provide: DestroyRoleDomainService,
      useFactory: (roleRepository: IRoleRepositoryContract): DestroyRoleDomainService => {
        return new DestroyRoleDomainService(roleRepository);
      },
      inject: [IRoleRepositoryContract],
    },
    {
      provide: GetRoleDomainService,
      useFactory: (roleRepository: IRoleRepositoryContract): GetRoleDomainService => {
        return new GetRoleDomainService(roleRepository);
      },
      inject: [IRoleRepositoryContract],
    },
    {
      provide: ListRoleDomainService,
      useFactory: (roleRepository: IRoleRepositoryContract): ListRoleDomainService => {
        return new ListRoleDomainService(roleRepository);
      },
      inject: [IRoleRepositoryContract],
    },
    // Repositories
    {
      provide: ROLE_REPOSITORY,
      useClass: RoleTypeormRepository,
    },
    {
      provide: IRoleRepositoryContract,
      useClass: RoleTypeormRepository,
    },
    // Event Handlers
    RoleReDescribedEventHandler,
    RoleArchivedEventHandler,
    // Services
    MediatorStoreService,
    RoleFacadeService,
  ],
  controllers: [
    CreateRoleController,
    UpdateRoleController,
    ArchiveRoleController,
    DestroyRoleController,
    GetRoleController,
    ListRoleController,
  ],
  exports: [RoleFacadeService],
})
export class RoleModule {}
