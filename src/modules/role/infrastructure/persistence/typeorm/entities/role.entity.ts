import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { TypeormBaseEntity } from '@common/infrastructure/persistence/typeorm/entities/typeorm-base.entity';
import {
  MAX_ROLE_NAME_LENGTH,
  MAX_ROLE_DESCRIPTION_LENGTH,
} from '@role/domain/constants/general-rules';

@Entity('roles')
export class RoleEntity extends TypeormBaseEntity {
  @PrimaryGeneratedColumn('identity', { name: 'id', type: 'int' })
  id: number;

  @Column({
    name: 'uuid',
    generated: 'uuid',
    unique: true,
  })
  uuid: string;

  @Column({
    name: 'name',
    unique: true,
    length: MAX_ROLE_NAME_LENGTH,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true,
    length: MAX_ROLE_DESCRIPTION_LENGTH,
  })
  description: string | null;
}
