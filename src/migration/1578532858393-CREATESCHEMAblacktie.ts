import { MigrationInterface, QueryRunner } from "typeorm";

export class CREATESCHEMAblacktie1578532858393 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    try {
      await queryRunner.query(`CREATE SCHEMA blacktie AUTHORIZATION postgres;`);
    } catch (error) {}
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
