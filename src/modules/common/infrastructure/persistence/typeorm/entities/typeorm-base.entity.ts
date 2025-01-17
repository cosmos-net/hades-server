import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export class TypeormBaseEntity {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: (): string => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: (): string => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'archived_at',
    type: 'timestamp',
    nullable: true,
  })
  archivedAt: Date | null;
}
