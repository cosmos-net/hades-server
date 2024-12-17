import { PrimaryGeneratedColumn, Column, OneToOne, OneToMany, Entity } from 'typeorm';

import { TypeormBaseEntity } from '@common/infrastructure/persistence/typeorm/entities/typeorm-base.entity';
import { StatusEnum } from '@user/domain/enums/user-status-enum';
import { IUserSchemaPrimitives } from '@user/domain/schemas/user/user.schema-primitive';
import { AccountEntity } from '@user/infrastructure/persistence/typeorm/entities/account.entity';
import { ProfileEntity } from '@user/infrastructure/persistence/typeorm/entities/profile.entity';

@Entity('users')
export class UserEntity extends TypeormBaseEntity implements IUserSchemaPrimitives {
  @PrimaryGeneratedColumn('identity', { type: 'int', name: 'id' })
  id: number;

  @Column({ generated: 'uuid', unique: true, name: 'uuid' })
  uuid: string;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    nullable: false,
  })
  status: StatusEnum;

  @OneToOne(() => ProfileEntity, (profile) => profile.user, {
    cascade: true,
    eager: false,
  })
  profile: ProfileEntity;

  @OneToMany(() => AccountEntity, (account) => account.user, {
    cascade: true,
    eager: false,
  })
  accounts: AccountEntity[];
}
