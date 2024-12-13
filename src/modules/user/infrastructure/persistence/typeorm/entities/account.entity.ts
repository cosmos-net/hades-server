import { PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany, Entity } from 'typeorm';

import { TypeormBaseEntity } from '@common/infrastructure/persistence/typeorm/entities/typeorm-base-entity';
import {
  MAX_ACCOUNT_EMAIL_LENGTH,
  MAX_ACCOUNT_USER_NAME_LENGTH,
} from '@user/domain/constants/general-rules';
import { IAccountSchemaPrimitives } from '@user/domain/schemas/account/account.schema-primitive';
import { SessionEntity } from '@user/infrastructure/persistence/typeorm/entities/session.entity';
import { UserEntity } from '@user/infrastructure/persistence/typeorm/entities/user.entity';

@Entity('accounts')
export class AccountEntity extends TypeormBaseEntity implements IAccountSchemaPrimitives {
  @PrimaryGeneratedColumn('identity', { type: 'int', name: 'id' })
  id: number;

  @Column({ generated: 'uuid', unique: true, name: 'uuid' })
  uuid: string;

  @Column({
    name: 'username',
    type: 'varchar',
    length: MAX_ACCOUNT_USER_NAME_LENGTH,
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: MAX_ACCOUNT_EMAIL_LENGTH,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @ManyToOne(() => UserEntity, (user) => user.accounts, {
    nullable: false,
    cascade: false,
    eager: false,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_account_user',
  })
  user: UserEntity;

  @OneToMany(() => SessionEntity, (session) => session.account, { cascade: true, nullable: true })
  sessions?: SessionEntity[] | null;
}
