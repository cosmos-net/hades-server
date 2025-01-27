import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssignmentEntity } from '@assignment/infrastructure/persistence/typeorm/entities/assignment.entity';
import { SharedModule } from '@shared/infrastructure/framework/shared.module';

@Module({
  imports: [CqrsModule, SharedModule, TypeOrmModule.forFeature([AssignmentEntity])],
  providers: [],
  controllers: [],
  exports: [],
})
export class AssignmentModule {}
