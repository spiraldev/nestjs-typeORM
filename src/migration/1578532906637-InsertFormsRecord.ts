import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertFormsRecord1578532906637 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    try {
      const foobar = Math.floor(Math.random() * 10 + 1);
      await queryRunner.query(`TRUNCATE "blacktie"."forms";`);
      await queryRunner.query(`DELETE FROM "blacktie"."forms";`);
      await queryRunner.query(`INSERT INTO "blacktie"."forms" (
            "id",
            "formfamily_id",
            "published_formversion_id",
            "name",
            "description",
            "active",
            "properties",
            "createdby",
            "createdat",
            "modifiedby",
            "modifiedat"
          )
        VALUES
          (
            '10',
            '1',
            NULL,
            '${foobar} Test',
            NULL,
            'f',
            '{"lang": "en", "end_date": "", "start_date": "", "campaign_ids": []}',
            NULL,
            '2019-04-10 14:39:24.874',
            NULL,
            '2019-04-10 14:39:24.905'
          );`);
    } catch (error) {}
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
