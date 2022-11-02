import { Module, ModuleMetadata } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { VaccineRepository } from './repository/VaccineRepository';
import { mongo } from '../../mongo.ormconfig';
import { Vaccine } from './entity/Vaccine';
import { VaccineService } from './service/VaccineService';
import { MongoMemoryServer } from 'mongodb-memory-server';

export const vaccineModuleMetadata: ModuleMetadata = {
  imports: [
    TypeOrmModule.forFeature([Vaccine]),
    TypeOrmModule.forRootAsync({
      useFactory: async (): Promise<TypeOrmModuleOptions> => {
        if ('test' !== process.env.NODE_ENV) {
          return mongo;
        }

        const mongodb: MongoMemoryServer = await MongoMemoryServer.create();
        const url = mongodb.getUri();

        return {
          ...mongo,
          url,
          keepConnectionAlive: true,
        };
      },
    }),
  ],
  providers: [VaccineRepository, VaccineService],
  exports: [VaccineRepository, VaccineService],
};

@Module(vaccineModuleMetadata)
export class VaccineModule {}
