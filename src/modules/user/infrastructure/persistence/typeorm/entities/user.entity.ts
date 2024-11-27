import { PrimaryGeneratedColumn, Column, OneToOne, OneToMany, Entity } from 'typeorm';

import { TypeormBaseEntity } from '@common/infrastructure/persistence/typeorm/entities/typeorm-base-entity';
import { UserStatusEnum } from '@user/domain/constants/general-rules';
import { AccountEntity } from '@user/infrastructure/persistence/typeorm/entities/account.entity';
import { ProfileEntity } from '@user/infrastructure/persistence/typeorm/entities/profile.entity';

@Entity('users')
export class UserEntity extends TypeormBaseEntity {
  @PrimaryGeneratedColumn('identity', { type: 'int', name: 'id' })
  id: number;

  @Column({ generated: 'uuid', unique: true, name: 'uuid' })
  uuid: string;

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    nullable: false,
  })
  status: UserStatusEnum;

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
