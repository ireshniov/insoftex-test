import { Module, ModuleMetadata } from '@nestjs/common';
import { VaccineSummaryModule } from './vaccine-summary/VaccineSummaryModule';

export const appModuleMetadata: ModuleMetadata = {
  imports: [VaccineSummaryModule],
};

@Module(appModuleMetadata)
export class AppModule {}
