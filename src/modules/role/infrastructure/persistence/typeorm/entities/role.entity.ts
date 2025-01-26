import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

import { AssignmentEntity } from '@assignment/infrastructure/persistence/typeorm/entities/assignment.entity';
import { TypeormBaseEntity } from '@common/infrastructure/persistence/typeorm/entities/typeorm-base.entity';
import {
  MAX_ROLE_NAME_LENGTH,
  MAX_ROLE_DESCRIPTION_LENGTH,
} from '@role/domain/constants/general-rules';
import { IRoleSchemaPrimitives } from '@role/domain/schemas/role.schema-primitives';

@Entity('roles')
export class RoleEntity extends TypeormBaseEntity implements IRoleSchemaPrimitives {
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

  @OneToOne(
    (): typeof AssignmentEntity => AssignmentEntity,
    (assignment): RoleEntity => assignment.role,
    {
      cascade: true,
      eager: false,
    },
  )
  assignment: AssignmentEntity;
}
