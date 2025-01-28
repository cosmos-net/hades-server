import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetupFirstMigrations1738046365777 implements MigrationInterface {
  name = 'SetupFirstMigrations1738046365777';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "roles" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "archived_at" TIMESTAMP, "id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying(255), CONSTRAINT "UQ_cdc7776894e484eaed828ca0616" UNIQUE ("uuid"), CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "assignments" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "archived_at" TIMESTAMP, "id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "description" character varying(500), "role_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "UQ_9ca6a74af5f9823bd7fc6938a3a" UNIQUE ("uuid"), CONSTRAINT "REL_253fa3c633a343fd927f1191f7" UNIQUE ("role_id"), CONSTRAINT "REL_3e96b2dc80534b727b58b87b85" UNIQUE ("user_id"), CONSTRAINT "PK_c54ca359535e0012b04dcbd80ee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sessions_session_closed_type_enum" AS ENUM('manual', 'automatic')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sessions_status_enum" AS ENUM('active', 'inactive', 'expired', 'closed', 'suspended', 'invalid', 'pending')`,
    );
    await queryRunner.query(
      `CREATE TABLE "sessions" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "archived_at" TIMESTAMP, "id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "session_id" character varying(255), "session_type" character varying(50) NOT NULL, "session_duration" integer, "session_closed_type" "public"."sessions_session_closed_type_enum", "token" character varying(255), "expires_in_at" TIMESTAMP, "logged_in_at" TIMESTAMP, "logged_out_at" TIMESTAMP, "ip_address" character varying(100) NOT NULL, "refresh_token" character varying, "user_agent" character varying(255) NOT NULL, "failed_attempts" integer NOT NULL DEFAULT '0', "origin" character varying(100) NOT NULL, "location" character varying(100) NOT NULL, "status" "public"."sessions_status_enum" NOT NULL, "accountId" integer NOT NULL, CONSTRAINT "UQ_faf29798ea59ac7f07b1be6f79b" UNIQUE ("uuid"), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "accounts" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "archived_at" TIMESTAMP, "id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(100) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "UQ_45705ce5c594e0b9f6158a43370" UNIQUE ("uuid"), CONSTRAINT "UQ_477e3187cedfb5a3ac121e899c9" UNIQUE ("username"), CONSTRAINT "UQ_ee66de6cdc53993296d1ceb8aa0" UNIQUE ("email"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."profiles_gender_enum" AS ENUM('MAN', 'WOMAN')`);
    await queryRunner.query(
      `CREATE TABLE "profiles" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "archived_at" TIMESTAMP, "id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "names" text NOT NULL, "last_name" character varying(100) NOT NULL, "second_last_name" character varying(100), "phone_number" character varying(13) NOT NULL, "gender" "public"."profiles_gender_enum" NOT NULL, "user_id" integer, "addressStreet" character varying(100) NOT NULL, "addressExt_number" character varying(10) NOT NULL, "addressInt_number" character varying(10), "addressNeighborhood" character varying(100) NOT NULL, "addressZip_code" character varying(10) NOT NULL, "addressCity" character varying(100) NOT NULL, "addressState" character varying(100) NOT NULL, "addressCountry" character varying(100) NOT NULL, CONSTRAINT "UQ_2c0c7196c89bdcc9b04f29f3fe6" UNIQUE ("uuid"), CONSTRAINT "UQ_b4914d605fd119c1046868effcb" UNIQUE ("phone_number"), CONSTRAINT "REL_9e432b7df0d182f8d292902d1a" UNIQUE ("user_id"), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_status_enum" AS ENUM('Active', 'Inactive', 'Pending', 'Suspended', 'Archived', 'Banned', 'UnderReview')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "archived_at" TIMESTAMP, "id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."users_status_enum" NOT NULL, CONSTRAINT "UQ_951b8f1dfc94ac1d0301a14b7e1" UNIQUE ("uuid"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "assignments" ADD CONSTRAINT "fk_assignment_role_id" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "assignments" ADD CONSTRAINT "fk_assignment_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_6fee377066ebeed22567e4390ee" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD CONSTRAINT "FK_account_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD CONSTRAINT "FK_profile_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_profile_user"`);
    await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_account_user"`);
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_6fee377066ebeed22567e4390ee"`,
    );
    await queryRunner.query(`ALTER TABLE "assignments" DROP CONSTRAINT "fk_assignment_user_id"`);
    await queryRunner.query(`ALTER TABLE "assignments" DROP CONSTRAINT "fk_assignment_role_id"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
    await queryRunner.query(`DROP TABLE "profiles"`);
    await queryRunner.query(`DROP TYPE "public"."profiles_gender_enum"`);
    await queryRunner.query(`DROP TABLE "accounts"`);
    await queryRunner.query(`DROP TABLE "sessions"`);
    await queryRunner.query(`DROP TYPE "public"."sessions_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."sessions_session_closed_type_enum"`);
    await queryRunner.query(`DROP TABLE "assignments"`);
    await queryRunner.query(`DROP TABLE "roles"`);
  }
}