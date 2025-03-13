import { Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { TypeormBaseEntity } from '@common/infrastructure/persistence/typeorm/entities/typeorm-base.entity';
import { permissionCombinationType } from '@permission/domain/constants/permission-combination-type.constant';
import { PERMISSION_RULES } from '@permission/domain/constants/permission-rules.constant';
import { IPermissionSchemaPrimitives } from '@permission/domain/schemas/permission.schema-primitives';
import { PolicyEntity } from '@policy/infrastructure/persistence/typeorm/entities/policy.entity';

@Entity('assignments')
export class PermissionEntity extends TypeormBaseEntity implements IPermissionSchemaPrimitives {
  @PrimaryGeneratedColumn('identity', { name: 'id', type: 'int' })
  id: number;

  @Column({
    name: 'uuid',
    generated: 'uuid',
    unique: true,
  })
  uuid: string;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true,
    length: PERMISSION_RULES.DESCRIPTION.MAX_LENGTH,
  })
  @Length(PERMISSION_RULES.DESCRIPTION.MIN_LENGTH, PERMISSION_RULES.DESCRIPTION.MAX_LENGTH)
  description?: string | null;

  @Column({
    name: 'action',
    type: 'jsonb',
    nullable: false,
  })
  action: permissionCombinationType['action'];

  @Column({
    name: 'module',
    type: 'jsonb',
    nullable: false,
  })
  module: permissionCombinationType['module'];

  @Column({
    name: 'submodule',
    type: 'jsonb',
    nullable: true,
  })
  submodule?: permissionCombinationType['submodule'] | null;

  @OneToMany(
    (): typeof PolicyEntity => PolicyEntity,
    (policy): PermissionEntity => policy.permission,
    {
      cascade: false,
      eager: false,
    },
  )
  policies: PolicyEntity[];
}
