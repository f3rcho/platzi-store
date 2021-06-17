import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFields1623943503164 implements MigrationInterface {
  name = 'addFields1623943503164';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "createAt"`);
  }
}