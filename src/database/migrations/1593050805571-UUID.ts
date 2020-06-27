import { MigrationInterface, QueryRunner } from 'typeorm';

export default class UUID1593050805571 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('drop EXTENSION IF EXISTS "uuid-ossp";');
  }
}
