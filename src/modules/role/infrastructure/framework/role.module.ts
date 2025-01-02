import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArchiveRoleUseCase } from '@role/application/commands/use-cases/archive-role/archive-role.use-case';
import { CreateRoleUseCase } from '@role/application/commands/use-cases/create-role/create-role.use-case';
import { UpdateRoleUseCase } from '@role/application/commands/use-cases/update-role/update-role.use-case';
import { GetRoleUseCase } from '@role/application/queries/get-role/get-role.use-case';
import { ListRoleUseCase } from '@role/application/queries/list-role/list-role.use-case';
import { ROLE_REPOSITORY } from '@role/domain/constants/injection-tokens';
import { ArchiveRoleDomainService } from '@role/domain/domain-service/archive-role.domain-service';
import { CreateRoleDomainService } from '@role/domain/domain-service/create-role.domain-service';
import { DestroyRoleDomainService } from '@role/domain/domain-service/destroy-role.domain-service';
import { GetRoleDomainService } from '@role/domain/domain-service/get-role.domain-service';
import { UpdateRoleDomainService } from '@role/domain/domain-service/update-role.domain-service';
import { ListRoleDomainService } from '@role/domain/domain-service/list-role.domain-service';
import { CreateRoleController } from '@role/infrastructure/controllers/commands/create-role/create-role.controller';
import { RoleReDescribedEventHandler } from '@role/infrastructure/events-handler/success/role-redescribed.event-handler';
import { RoleEntity } from '@role/infrastructure/persistence/typeorm/entities/role.entity';
import { RoleTypeormRepository } from '@role/infrastructure/persistence/typeorm/repositories/role-typeorm.repository';
import { ArchiveRoleController } from '@role/infrastructure/controllers/commands/archive-role/archive-role.controller';
import { DestroyRoleController } from '@role/infrastructure/controllers/commands/destroy-role/destroy-role.controller';
import { UpdateRoleController } from '@role/infrastructure/controllers/commands/update-role/update-role.controller';
import { GetRoleController } from '@role/infrastructure/controllers/queries/get-role/get-role.controller';
import { ListRoleController } from '@role/infrastructure/controllers/queries/list-role/list-role.controller';
import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { DestroyRoleUseCase } from '@role/application/commands/use-cases/destroy-role/destroy-role.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]), CqrsModule],
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
    // Event Handlers
    RoleReDescribedEventHandler,
    // Repositories
    {
      provide: ROLE_REPOSITORY,
      useClass: RoleTypeormRepository,
    },
    {
      provide: IRoleRepositoryContract,
      useClass: RoleTypeormRepository,
    },
  ],
  controllers: [
    CreateRoleController,
    UpdateRoleController,
    ArchiveRoleController,
    DestroyRoleController,
    GetRoleController,
    ListRoleController,
  ],
  exports: [],
})
export class RoleModule {}
