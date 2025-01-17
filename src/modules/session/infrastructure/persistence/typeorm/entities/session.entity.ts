import { Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { TypeormBaseEntity } from '@common/infrastructure/persistence/typeorm/entities/typeorm-base.entity';
import { SESSION } from '@session/domain/constants/general-rules';
import { SessionClosedTypeEnum } from '@session/domain/constants/session-closed-type.enum';
import { SessionStatusEnum } from '@session/domain/constants/session-status.enum';
import { ISessionSchemaPrimitives } from '@session/domain/schemas/session.schema-primitives';
import { AccountEntity } from '@user/infrastructure/persistence/typeorm/entities/account.entity';

@Entity('sessions')
export class SessionEntity extends TypeormBaseEntity implements ISessionSchemaPrimitives {
  @PrimaryGeneratedColumn('identity', { name: 'id', type: 'int' })
  id: number;

  @Column({
    name: 'uuid',
    generated: 'uuid',
    unique: true,
  })
  uuid: string;

  @Column({
    name: 'session_id',
    type: 'varchar',
    length: SESSION.SESSION_ID.MAX_LENGTH,
    nullable: true,
  })
  @Length(SESSION.SESSION_ID.MIN_LENGTH, SESSION.SESSION_ID.MAX_LENGTH)
  sessionId?: string | null;

  @Column({
    name: 'session_type',
    type: 'varchar',
    length: SESSION.SESSION_TYPE.MAX_LENGTH,
  })
  @Length(SESSION.SESSION_TYPE.MIN_LENGTH, SESSION.SESSION_TYPE.MAX_LENGTH)
  sessionType: string;

  @Column({
    name: 'session_duration',
    type: 'int',
    nullable: true,
  })
  sessionDuration?: number | null;

  @Column({
    name: 'session_closed_type',
    type: 'enum',
    enum: SessionClosedTypeEnum,
    nullable: true,
  })
  sessionClosedType?: SessionClosedTypeEnum | null;

  @Column({
    name: 'token',
    type: 'varchar',
    nullable: true,
    length: SESSION.TOKEN.MAX_LENGTH,
  })
  @Length(SESSION.TOKEN.MIN_LENGTH, SESSION.TOKEN.MAX_LENGTH)
  token?: string | null;

  @Column({
    name: 'expires_in_at',
    type: 'timestamp',
    nullable: true,
  })
  expiresInAt?: Date | null;

  @Column({
    name: 'logged_in_at',
    type: 'timestamp',
    nullable: true,
  })
  loggedInAt?: Date | null;

  @Column({
    name: 'logged_out_at',
    type: 'timestamp',
    nullable: true,
  })
  loggedOutAt?: Date;

  @Column({
    name: 'ip_address',
    type: 'varchar',
    length: SESSION.IP_ADDRESS.MAX_LENGTH,
  })
  @Length(SESSION.IP_ADDRESS.MIN_LENGTH, SESSION.IP_ADDRESS.MAX_LENGTH)
  ipAddress: string;

  @Column({
    name: 'refresh_token',
    type: 'varchar',
    nullable: true,
  })
  @Length(SESSION.REFRESH_TOKEN.MIN_LENGTH, SESSION.REFRESH_TOKEN.MAX_LENGTH)
  refreshToken?: string | null;

  @Column({
    name: 'user_agent',
    type: 'varchar',
    length: SESSION.USER_AGENT.MAX_LENGTH,
  })
  @Length(SESSION.USER_AGENT.MIN_LENGTH, SESSION.USER_AGENT.MAX_LENGTH)
  userAgent: string;

  @Column({
    name: 'failed_attempts',
    type: 'int',
    default: 0,
  })
  failedAttempts: number;

  @Column({
    name: 'origin',
    type: 'varchar',
    length: SESSION.ORIGIN.MAX_LENGTH,
  })
  @Length(SESSION.ORIGIN.MIN_LENGTH, SESSION.ORIGIN.MAX_LENGTH)
  origin: string;

  @Column({
    name: 'location',
    type: 'varchar',
    length: SESSION.LOCATION.MAX_LENGTH,
  })
  @Length(SESSION.LOCATION.MIN_LENGTH, SESSION.LOCATION.MAX_LENGTH)
  location: string;

  @Column({
    type: 'enum',
    enum: SessionStatusEnum,
    nullable: false,
  })
  status: SessionStatusEnum;

  @ManyToOne(
    (): typeof AccountEntity => AccountEntity,
    (account): SessionEntity[] => account.sessions,
    { nullable: false },
  )
  account: AccountEntity;
}
