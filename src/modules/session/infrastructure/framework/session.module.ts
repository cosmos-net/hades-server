import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from '@session/infrastructure/persistence/typeorm/entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity]), CqrsModule],
  providers: [
    // UseCases
    // Domain Services
    // Event Handlers
    // Repositories
  ],
  controllers: [],
  exports: [],
})
export class SessionModule {}
