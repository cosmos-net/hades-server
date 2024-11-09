import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import {
  MAX_ROLE_NAME_LENGTH,
  MAX_ROLE_DESCRIPTION_LENGTH,
} from '@role/domain/constants/general-rules';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ unique: true, length: MAX_ROLE_NAME_LENGTH })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: MAX_ROLE_DESCRIPTION_LENGTH,
  })
  description: string | null;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
