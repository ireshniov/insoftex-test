import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { LoggerService } from '../module/common/logger/service/LoggerService';
import { SeedVaccineModule } from '../module/seed-vaccine/SeedVaccineModule';
import { SeedVaccineService } from '../module/seed-vaccine/service/SeedVaccineService';

(async (): Promise<void> => {
  const logger: LoggerService = new LoggerService(SeedVaccineModule.name);
  const app: INestApplicationContext =
    await NestFactory.createApplicationContext(SeedVaccineModule, { logger });

  await app.init();

  try {
    await app.get(SeedVaccineService).seed();
    process.exit(0);
  } catch (err: any) {
    logger.exception(err);
    process.exit(1);
  }
})();
