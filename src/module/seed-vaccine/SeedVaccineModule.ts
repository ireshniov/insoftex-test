import { Module, ModuleMetadata } from '@nestjs/common';
import { VaccineModule } from '../vaccine/VaccineModule';
import { SeedVaccineService } from './service/SeedVaccineService';

export const seedVaccineModuleMetadata: ModuleMetadata = {
  imports: [VaccineModule],
  providers: [SeedVaccineService],
};

@Module(seedVaccineModuleMetadata)
export class SeedVaccineModule {}
