import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableSessionAddColumnStatusAndRenameExpiresInToExpiresInAt1735856653798
  implements MigrationInterface
{
  name = 'AlterTableSessionAddColumnStatusAndRenameExpiresInToExpiresInAt1735856653798';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "expiresIn"`);
    await queryRunner.query(`ALTER TABLE "sessions" ADD "expiresInAt" TIMESTAMP NOT NULL`);
    await queryRunner.query(
      `CREATE TYPE "public"."sessions_status_enum" AS ENUM('active', 'inactive', 'expired', 'closed', 'suspended', 'invalid', 'pending')`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD "status" "public"."sessions_status_enum" NOT NULL DEFAULT 'pending'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."sessions_status_enum"`);
    await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "expiresInAt"`);
    await queryRunner.query(`ALTER TABLE "sessions" ADD "expiresIn" TIMESTAMP NOT NULL`);
  }
}
