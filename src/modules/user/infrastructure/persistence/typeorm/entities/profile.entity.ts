import { PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, Entity } from 'typeorm';

import { Address } from '@common/infrastructure/persistence/typeorm/entities/typeorm-address.embeddable';
import { TypeormBaseEntity } from '@common/infrastructure/persistence/typeorm/entities/typeorm-base-entity';
import {
  MAX_PROFILE_LAST_NAME_LENGTH,
  MAX_PROFILE_PHONE_NUMBER_LENGTH,
  MAX_PROFILE_SECOND_LAST_NAME_LENGTH,
  ProfileGenderEnum,
} from '@user/domain/constants/general-rules';
import { IProfileSchemaPrimitives } from '@user/domain/schemas/profile/profile.schema-primitive';
import { UserEntity } from '@user/infrastructure/persistence/typeorm/entities/user.entity';

@Entity('profiles')
export class ProfileEntity extends TypeormBaseEntity implements IProfileSchemaPrimitives {
  @PrimaryGeneratedColumn('identity', { type: 'int', name: 'id' })
  id: number;

  @Column({ generated: 'uuid', unique: true, name: 'uuid' })
  uuid: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  names: string[];

  @Column({
    type: 'varchar',
    length: MAX_PROFILE_LAST_NAME_LENGTH,
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: MAX_PROFILE_SECOND_LAST_NAME_LENGTH,
    nullable: true,
  })
  secondLastName: string | null;

  @Column({
    type: 'varchar',
    length: MAX_PROFILE_PHONE_NUMBER_LENGTH,
    nullable: false,
    unique: true,
  })
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: ProfileGenderEnum,
    nullable: false,
  })
  gender: ProfileGenderEnum;

  @Column(() => Address)
  address: Address;

  @OneToOne(() => UserEntity, (user) => user.profile)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_profile_user',
  })
  user: UserEntity;
}
