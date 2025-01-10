import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableSessionNullSomeColumns1735863439814 implements MigrationInterface {
  name = 'AlterTableSessionNullSomeColumns1735863439814';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sessions" ALTER COLUMN "sessionClosedType" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "expiresInAt" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "loggedInAt" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "sessions" ALTER COLUMN "sessionClosedType" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "expiresInAt" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "loggedInAt" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "loggedInAt" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "expiresInAt" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "sessionClosedType" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "loggedInAt" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "expiresInAt" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "sessionClosedType" SET NOT NULL`);
  }
}
