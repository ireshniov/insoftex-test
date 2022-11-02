import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { DEFAULT_DATA_SOURCE_NAME } from '@nestjs/typeorm/dist/typeorm.constants';
import { Vaccine } from './module/vaccine/entity/Vaccine';
import { InitVaccineCollection1667161179510 } from './migration/1667161179510-InitVaccineCollection';

export const mongo: MongoConnectionOptions = {
  name: DEFAULT_DATA_SOURCE_NAME,
  type: 'mongodb',
  url: process.env.MONGO_URL,
  entities: [Vaccine],
  subscribers: [],
  synchronize: false,
  logging:
    process.env.MONGO_LOGGING === 'true'
      ? true
      : (process.env.MONGO_LOGGING as any),
  migrations: [InitVaccineCollection1667161179510],
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'each',
  migrationsRun: false,
  useUnifiedTopology: true,
};
