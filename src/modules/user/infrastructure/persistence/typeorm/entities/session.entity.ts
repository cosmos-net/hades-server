import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { TypeormBaseEntity } from '@common/infrastructure/persistence/typeorm/entities/typeorm-base-entity';
import { SESSION } from '@user/domain/constants/general-rules';
import { ISessionSchemaPrimitive } from '@user/domain/schemas/session/session.schema-primitive';
import { AccountEntity } from '@user/infrastructure/persistence/typeorm/entities/account.entity';

@Entity('sessions')
export class SessionEntity extends TypeormBaseEntity implements ISessionSchemaPrimitive {
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

  @Column({ type: 'varchar', length: SESSION.SESSION_CLOSED_TYPE.MAX_LENGTH })
  sessionClosedType: string;

  @Column({ type: 'text', length: SESSION.TOKEN.MAX_LENGTH })
  token: string;

  @Column({ type: 'timestamp' })
  expiresIn: Date;

  @Column({ type: 'timestamp' })
  loggedInAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  loggedOutAt?: Date;

  @Column({ type: 'varchar', length: SESSION.IP_ADDRESS.MAX_LENGTH })
  ipAddress: string;

  @Column({ type: 'text', length: SESSION.REFRESH_TOKEN.MAX_LENGTH })
  refreshToken: string;

  @Column({ type: 'varchar', length: SESSION.USER_AGENT.MAX_LENGTH })
  userAgent: string;

  @Column({ type: 'int', default: 0 })
  failedAttempts: number;

  @Column({ type: 'varchar', length: SESSION.ORIGIN.MAX_LENGTH })
  origin: string;

  @Column({ type: 'varchar', length: SESSION.LOCATION.MAX_LENGTH })
  location: string;

  @ManyToOne(() => AccountEntity, (account) => account.sessions, { nullable: false })
  account: AccountEntity;
}
