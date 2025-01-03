import { Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { TypeormBaseEntity } from '@common/infrastructure/persistence/typeorm/entities/typeorm-base.entity';
import { SESSION } from '@session/domain/constants/general-rules';
import { SessionStatusEnum } from '@session/domain/constants/session-status.enum';
import { ISessionSchemaPrimitives } from '@session/domain/schemas/session.schema-primitives';
import { AccountEntity } from '@user/infrastructure/persistence/typeorm/entities/account.entity';

@Entity('sessions')
export class SessionEntity extends TypeormBaseEntity implements ISessionSchemaPrimitives {
  @PrimaryGeneratedColumn('identity', { type: 'int', name: 'id' })
  id: number;

  @Column({ generated: 'uuid', unique: true, name: 'uuid' })
  uuid: string;

  @Column({ type: 'varchar', length: SESSION.SESSION_ID.MAX_LENGTH })
  sessionId: string;

  @Column({ type: 'varchar', length: SESSION.SESSION_TYPE.MAX_LENGTH })
  sessionType: string;

  @Column({ type: 'int' })
  sessionDuration: number;

  @Column({ type: 'varchar', length: SESSION.SESSION_CLOSED_TYPE.MAX_LENGTH, nullable: true })
  sessionClosedType: string | null;

  @Column({ type: 'text' })
  @Length(SESSION.TOKEN.MIN_LENGTH, SESSION.TOKEN.MAX_LENGTH)
  token: string;

  @Column({ type: 'timestamp', nullable: true })
  expiresInAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  loggedInAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  loggedOutAt?: Date;

  @Column({ type: 'varchar', length: SESSION.IP_ADDRESS.MAX_LENGTH })
  ipAddress: string;

  @Column({ type: 'text' })
  @Length(SESSION.REFRESH_TOKEN.MIN_LENGTH, SESSION.REFRESH_TOKEN.MAX_LENGTH)
  refreshToken: string;

  @Column({ type: 'varchar', length: SESSION.USER_AGENT.MAX_LENGTH })
  userAgent: string;

  @Column({ type: 'int', default: 0 })
  failedAttempts: number;

  @Column({ type: 'varchar', length: SESSION.ORIGIN.MAX_LENGTH })
  origin: string;

  @Column({ type: 'varchar', length: SESSION.LOCATION.MAX_LENGTH })
  location: string;

  @Column({
    type: 'enum',
    enum: SessionStatusEnum,
    default: 'pending',
  })
  status: SessionStatusEnum;

  @ManyToOne(() => AccountEntity, (account) => account.sessions, { nullable: false })
  account: AccountEntity;
}
