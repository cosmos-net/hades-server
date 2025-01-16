import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableSessionAlterColumnSessionClosedTypeNotRequired1737008958713
  implements MigrationInterface
{
  name = 'AlterTableSessionAlterColumnSessionClosedTypeNotRequired1737008958713';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sessions" ALTER COLUMN "sessionClosedType" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "sessionClosedType" SET NOT NULL`);
  }
}
