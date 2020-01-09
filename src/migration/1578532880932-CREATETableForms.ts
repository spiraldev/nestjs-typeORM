import { MigrationInterface, QueryRunner } from "typeorm";

export class CREATETableForms1578532880932 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    try {
      await queryRunner.query(`CREATE sequence blacktie.forms_id_seq;`);
      await queryRunner.query(`CREATE TABLE IF NOT EXISTS  "blacktie"."forms" (
            "id" int4 NOT NULL DEFAULT nextval('blacktie.forms_id_seq' :: regclass),
            "formfamily_id" int4,
            "published_formversion_id" int4,
            "name" varchar(150) NOT NULL,
            "description" varchar(250),
            "active" bool DEFAULT false,
            "properties" jsonb,
            "createdby" int4,
            "createdat" timestamp DEFAULT now(),
            "modifiedby" int4,
            "modifiedat" timestamp DEFAULT now(),
            PRIMARY KEY ("id")
          );`);
    } catch (error) {}
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
