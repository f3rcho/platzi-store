import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1623783165756 implements MigrationInterface {
  name = 'init1623783165756';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "brand" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "image" text NOT NULL, CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "sku" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "url" text NOT NULL, CONSTRAINT "UQ_34f6ca1cd897cc926bdcca1ca39" UNIQUE ("sku"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "isAdmin" boolean NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "customer"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "brand"`);
  }
}
