import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PolicyEntity } from '@policy/infrastructure/persistence/typeorm/entities/policy.entity';
import { SharedModule } from '@shared/infrastructure/framework/shared.module';

@Module({
  imports: [CqrsModule, SharedModule, TypeOrmModule.forFeature([PolicyEntity])],
  providers: [],
  controllers: [],
  exports: [],
})
export class PolicyModule {}
