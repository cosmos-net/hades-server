import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAllTablesToChangeDeletedAtToArchivedAt1734990330551
  implements MigrationInterface
{
  name = 'UpdateAllTablesToChangeDeletedAtToArchivedAt1734990330551';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "roles" RENAME COLUMN "deletedAt" TO "archivedAt"`);
    await queryRunner.query(`ALTER TABLE "profiles" RENAME COLUMN "deletedAt" TO "archivedAt"`);
    await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "deletedAt" TO "archivedAt"`);
    await queryRunner.query(`ALTER TABLE "accounts" RENAME COLUMN "deletedAt" TO "archivedAt"`);
    await queryRunner.query(`ALTER TABLE "sessions" RENAME COLUMN "deletedAt" TO "archivedAt"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sessions" RENAME COLUMN "archivedAt" TO "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "accounts" RENAME COLUMN "archivedAt" TO "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "archivedAt" TO "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "profiles" RENAME COLUMN "archivedAt" TO "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "roles" RENAME COLUMN "archivedAt" TO "deletedAt"`);
  }
}
