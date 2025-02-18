import { Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, Index, ManyToOne } from 'typeorm';

import { TypeormBaseEntity } from '@common/infrastructure/persistence/typeorm/entities/typeorm-base.entity';
import { PermissionEntity } from '@permission/infrastructure/persistence/typeorm/entities/permission.entity';
import { POLICY_RULES } from '@policy/domain/constants/policy-rules.constant';
import { IPolicySchemaPrimitives } from '@policy/domain/schemas/policy.schema-primitives';
import { RoleEntity } from '@role/infrastructure/persistence/typeorm/entities/role.entity';

@Entity('policies')
export class PolicyEntity extends TypeormBaseEntity implements IPolicySchemaPrimitives {
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
    length: POLICY_RULES.TITLE.MAX_LENGTH,
  })
  @Length(POLICY_RULES.TITLE.MIN_LENGTH, POLICY_RULES.TITLE.MAX_LENGTH)
  title: string;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true,
    length: POLICY_RULES.DESCRIPTION.MAX_LENGTH,
  })
  @Length(POLICY_RULES.DESCRIPTION.MIN_LENGTH, POLICY_RULES.DESCRIPTION.MAX_LENGTH)
  description?: string | null;

  @Column({
    name: 'role_id',
    type: 'int',
  })
  roleId: number;

  @Index('idx_policy_role_id')
  @ManyToOne((): typeof RoleEntity => RoleEntity, (role): PolicyEntity[] => role.policies, {
    cascade: false,
    eager: false,
    nullable: false,
  })
  @JoinColumn({
    name: 'role_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_policy_role_id',
  })
  role: RoleEntity;

  @Column({
    name: 'permission_id',
    type: 'int',
  })
  permissionId: number;

  @Index('idx_policy_permission_id')
  @ManyToOne(
    (): typeof PermissionEntity => PermissionEntity,
    (permission): PolicyEntity[] => permission.policies,
    {
      cascade: false,
      eager: false,
      nullable: false,
    },
  )
  @JoinColumn({
    name: 'permission_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_policy_permission_id',
  })
  permission: PermissionEntity;
}
