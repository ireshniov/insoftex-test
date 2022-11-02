import { MigrationInterface } from 'typeorm';
import { MongoQueryRunner } from 'typeorm/driver/mongodb/MongoQueryRunner';

export class InitVaccineCollection1667161179510 implements MigrationInterface {
  public async up(queryRunner: MongoQueryRunner): Promise<void> {
    await queryRunner.databaseConnection
      .db(queryRunner.connection.driver.database)
      .createCollection('vaccines');
  }
  public async down(queryRunner: MongoQueryRunner): Promise<void> {
    await queryRunner.databaseConnection
      .db(queryRunner.connection.driver.database)
      .dropCollection('vaccines');
  }
}
