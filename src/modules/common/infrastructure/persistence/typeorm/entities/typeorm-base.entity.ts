import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export class TypeormBaseEntity {
  @CreateDateColumn({
    type: 'timestamp',
    name: 'createdAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updatedAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deletedAt',
    nullable: true,
  })
  archivedAt: Date | null;
}
