import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationNameHere1578504680760 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
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
            '01 Test',
            NULL,
            'f',
            '{"lang": "en", "end_date": "", "start_date": "", "campaign_ids": []}',
            NULL,
            '2019-04-10 14:39:24.874',
            NULL,
            '2019-04-10 14:39:24.905'
          );`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
