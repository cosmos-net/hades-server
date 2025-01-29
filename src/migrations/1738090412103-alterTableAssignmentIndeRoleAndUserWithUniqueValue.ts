import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableAssignmentIndeRoleAndUserWithUniqueValue1738090412103
  implements MigrationInterface
{
  name = 'AlterTableAssignmentIndeRoleAndUserWithUniqueValue1738090412103';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_253fa3c633a343fd927f1191f7" ON "assignments" ("role_id") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_3e96b2dc80534b727b58b87b85" ON "assignments" ("user_id") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_3e96b2dc80534b727b58b87b85"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_253fa3c633a343fd927f1191f7"`);
  }
}
