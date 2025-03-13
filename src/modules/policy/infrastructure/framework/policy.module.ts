import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PolicyEntity } from '@policy/infrastructure/persistence/typeorm/entities/policy.entity';
import { PolicyFacadeService } from '@policy/infrastructure/services/facade/policy-facade.service';
import { SharedModule } from '@shared/infrastructure/framework/shared.module';

@Module({
  imports: [
    CqrsModule,
    forwardRef((): typeof SharedModule => SharedModule),
    TypeOrmModule.forFeature([PolicyEntity]),
  ],
  providers: [PolicyFacadeService],
  controllers: [],
  exports: [PolicyFacadeService],
})
export class PolicyModule {}
