import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateRolUseCase } from '@role/application/commands/use-cases/create-role/create-role.use-case';
import { CreateRoleDomainService } from '@role/domain/domain-service/create-role.domain-service';
import { ROLE_REPOSITORY } from '@role/domain/constants/injection-tokens';
import { CreateRoleController } from '@role/infrastructure/controllers/commands/create-role/create-role.controller';
import { RoleReDescribedEventHandler } from '@role/infrastructure/events-handler/success/role-redescribed.event-handler';
import { RoleEntity } from '@role/infrastructure/persistence/entities/role.entity';
import { RoleTypeormRepository } from '@role/infrastructure/persistence/repositories/role-typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]), CqrsModule],
  controllers: [CreateRoleController],
  providers: [
    {
      provide: 'CreateRoleDomainService',
      useFactory: (roleRepository: RoleTypeormRepository) => {
        return new CreateRoleDomainService(roleRepository);
      },
      inject: [RoleTypeormRepository],
    },
    {
      provide: ROLE_REPOSITORY,
      useClass: RoleTypeormRepository,
    },
    CreateRolUseCase,
    RoleTypeormRepository,
    RoleReDescribedEventHandler,
  ],
})
export class RoleModule {}
