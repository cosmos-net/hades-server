import { Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

import { ASSIGNMENT_RULES } from '@assignment/domain/constants/assignment-rules.constant';
import { IAssignmentSchemaPrimitives } from '@assignment/domain/schemas/assignment.schema-primitives';
import { TypeormBaseEntity } from '@common/infrastructure/persistence/typeorm/entities/typeorm-base.entity';
import { RoleEntity } from '@role/infrastructure/persistence/typeorm/entities/role.entity';
import { UserEntity } from '@user/infrastructure/persistence/typeorm/entities/user.entity';

@Entity('assignments')
export class AssignmentEntity extends TypeormBaseEntity implements IAssignmentSchemaPrimitives {
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
    length: ASSIGNMENT_RULES.TITLE.MAX_LENGTH,
  })
  @Length(ASSIGNMENT_RULES.TITLE.MIN_LENGTH, ASSIGNMENT_RULES.TITLE.MAX_LENGTH)
  title: string;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true,
    length: ASSIGNMENT_RULES.DESCRIPTION.MAX_LENGTH,
  })
  @Length(ASSIGNMENT_RULES.DESCRIPTION.MIN_LENGTH, ASSIGNMENT_RULES.DESCRIPTION.MAX_LENGTH)
  description: string | null;

  @OneToOne((): typeof RoleEntity => RoleEntity, (role): AssignmentEntity => role.assignment, {
    cascade: false,
    eager: false,
  })
  @JoinColumn({
    name: 'role_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_assignment_role_id',
  })
  role: RoleEntity;

  @OneToOne((): typeof UserEntity => UserEntity, (user): AssignmentEntity => user.assignment, {
    cascade: false,
    eager: false,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_assignment_user_id',
  })
  user: UserEntity;
}
