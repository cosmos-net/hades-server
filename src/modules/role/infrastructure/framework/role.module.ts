import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateRolUseCase } from '@role/application/commands/use-cases/create-role/create-role.use-case';
import { ROLE_REPOSITORY } from '@role/domain/constants/injection-tokens';
import { ArchiveRoleDomainService } from '@role/domain/domain-service/archive-role.domain-service';
import { CreateRoleDomainService } from '@role/domain/domain-service/create-role.domain-service';
import { DestroyRoleDomainService } from '@role/domain/domain-service/destroy-role.domain-service';
import { GetRoleDomainService } from '@role/domain/domain-service/get-role.domain-service';
import { UpdateRoleDomainService } from '@role/domain/domain-service/update-role.domain-service';
import { ListRoleDomainService } from '@role/domain/services/list-role.domain-service';
import { CreateRoleController } from '@role/infrastructure/controllers/commands/create-role/create-role.controller';
import { RoleReDescribedEventHandler } from '@role/infrastructure/events-handler/success/role-redescribed.event-handler';
import { RoleEntity } from '@role/infrastructure/persistence/entities/role.entity';
import { RoleTypeormRepository } from '@role/infrastructure/persistence/repositories/role-typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]), CqrsModule],
  controllers: [CreateRoleController],
  providers: [
    {
      provide: ROLE_REPOSITORY,
      useClass: RoleTypeormRepository,
    },
    {
      provide: CreateRoleDomainService.name,
      useFactory: (roleRepository: RoleTypeormRepository): CreateRoleDomainService => {
        return new CreateRoleDomainService(roleRepository);
      },
      inject: [RoleTypeormRepository],
    },
    {
      provide: UpdateRoleDomainService.name,
      useFactory: (roleRepository: RoleTypeormRepository): UpdateRoleDomainService => {
        return new UpdateRoleDomainService(roleRepository);
      },
      inject: [RoleTypeormRepository],
    },
    {
      provide: ArchiveRoleDomainService.name,
      useFactory: (roleRepository: RoleTypeormRepository): ArchiveRoleDomainService => {
        return new ArchiveRoleDomainService(roleRepository);
      },
      inject: [RoleTypeormRepository],
    },
    {
      provide: DestroyRoleDomainService.name,
      useFactory: (roleRepository: RoleTypeormRepository): DestroyRoleDomainService => {
        return new DestroyRoleDomainService(roleRepository);
      },
      inject: [RoleTypeormRepository],
    },
    {
      provide: GetRoleDomainService.name,
      useFactory: (roleRepository: RoleTypeormRepository): GetRoleDomainService => {
        return new GetRoleDomainService(roleRepository);
      },
      inject: [RoleTypeormRepository],
    },
    {
      provide: ListRoleDomainService.name,
      useFactory: (roleRepository: RoleTypeormRepository): ListRoleDomainService => {
        return new ListRoleDomainService(roleRepository);
      },
      inject: [RoleTypeormRepository],
    },
    CreateRolUseCase,
    RoleTypeormRepository,
    RoleReDescribedEventHandler,
  ],
})
export class RoleModule {}
