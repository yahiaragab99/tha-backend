import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSenderNumberToMessage1736720744014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "messages" ADD "sender_phone_number" character varying DEFAULT ''`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "sender_phone_number"`);
  }
}
