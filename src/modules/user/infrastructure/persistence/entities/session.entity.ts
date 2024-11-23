import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { TypeormBaseEntity } from '@common/infrastructure/persistence/typeorm/entities/typeorm-base-entity';
import { AccountEntity } from '@user/infrastructure/persistence/entities/account.entity';

@Entity('sessions')
export class SessionEntity extends TypeormBaseEntity {
  @PrimaryGeneratedColumn('identity', { type: 'int', name: 'id' })
  id: number;

  @Column({ generated: 'uuid', unique: true, name: 'uuid' })
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  sessionId: string;

  @Column({ type: 'varchar', length: 50 })
  sessionType: string;

  @Column({ type: 'int' })
  sessionDuration: number;

  @Column({ type: 'varchar', length: 50 })
  sessionClosedType: string;

  @Column({ type: 'text' })
  token: string;

  @Column({ type: 'timestamp' })
  expiresIn: Date;

  @Column({ type: 'timestamp' })
  loggedInAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  loggedOutAt?: Date;

  @Column({ type: 'varchar', length: 100 })
  ipAddress: string;

  @Column({ type: 'text' })
  refreshToken: string;

  @Column({ type: 'varchar', length: 255 })
  userAgent: string;

  @Column({ type: 'int', default: 0 })
  failedAttempts: number;

  @Column({ type: 'varchar', length: 100 })
  origin: string;

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @ManyToOne(() => AccountEntity, (account) => account.sessions, { nullable: false })
  account: AccountEntity;
}
