import { Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { TypeormBaseEntity } from '@common/infrastructure/persistence/typeorm/entities/typeorm-base.entity';
import { PERMISSION_RULES } from '@permission/domain/constants/permission-rules.constant';
import { IPermissionSchemaPrimitivesWithoutChildren } from '@permission/domain/schemas/permission.schema-primitives';

@Entity('assignments')
export class PermissionEntity
  extends TypeormBaseEntity
  implements IPermissionSchemaPrimitivesWithoutChildren
{
  @PrimaryGeneratedColumn('identity', { name: 'id', type: 'int' })
  id: number;

  @Column({
    name: 'uuid',
    generated: 'uuid',
    unique: true,
  })
  uuid: string;

  @Column({
    name: 'title',
    length: PERMISSION_RULES.TITLE.MAX_LENGTH,
  })
  @Length(PERMISSION_RULES.TITLE.MIN_LENGTH, PERMISSION_RULES.TITLE.MAX_LENGTH)
  title: string;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true,
    length: PERMISSION_RULES.DESCRIPTION.MAX_LENGTH,
  })
  @Length(PERMISSION_RULES.DESCRIPTION.MIN_LENGTH, PERMISSION_RULES.DESCRIPTION.MAX_LENGTH)
  description?: string | null;

  @Column({
    name: 'action_id',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  actionId: string;

  @Column({
    name: 'module_id',
    type: 'varchar',
    nullable: false,
  })
  moduleId: string;

  @Column({
    name: 'submodule_id',
    type: 'varchar',
    nullable: true,
  })
  submoduleId?: string | null;
}
