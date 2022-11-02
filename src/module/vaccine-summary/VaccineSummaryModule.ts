import { ExecutionContext, Module, ModuleMetadata } from '@nestjs/common';
import { VaccineSummaryService } from './service/VaccineSummaryService';
import { VaccineSummaryController } from './controller/VaccineSummaryController';
import { ThrottlerModule } from '@nestjs/throttler';
import { Request } from 'express';
import { VaccineModule } from '../vaccine/VaccineModule';
import { GetSummaryPipe } from './pipe/GetSummaryPipe';

export const vaccineSummaryModuleMetadata: ModuleMetadata = {
  imports: [
    VaccineModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 5,
      skipIf: (context: ExecutionContext) => {
        const throttledIp: string = process.env.RATE_LIMITER_IP || '';

        if (!throttledIp) {
          return true;
        }

        const req: Request = context.switchToHttp().getRequest();

        return throttledIp !== req.ip;
      },
    }),
  ],
  controllers: [VaccineSummaryController],
  providers: [VaccineSummaryService, GetSummaryPipe],
};

@Module(vaccineSummaryModuleMetadata)
export class VaccineSummaryModule {}
