import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssignmentEntity } from '@assignment/infrastructure/persistence/typeorm/entities/assignment.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([AssignmentEntity])],
  providers: [],
  controllers: [],
  exports: [],
})
export class AssignmentModule {}
