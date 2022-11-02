import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { getValidationPipeOf } from '../../common/pipe/ValidationPipe';
import { VaccineSummaryDto } from '../dto/VaccineSummaryDto';
import {
  IGetSummary,
  VaccineSummaryService,
} from '../service/VaccineSummaryService';
import { IVaccineSummary } from '../interface/IVaccineSummary';
import { ThrottlerGuard } from '@nestjs/throttler';
import { GetSummaryPipe } from '../pipe/GetSummaryPipe';

@UseGuards(ThrottlerGuard)
@Controller('vaccine-summary')
export class VaccineSummaryController {
  constructor(private readonly vaccineSummaryService: VaccineSummaryService) {}

  @Get()
  async get(
    @Query(getValidationPipeOf(VaccineSummaryDto), GetSummaryPipe)
    dto: IGetSummary,
  ): Promise<IVaccineSummary> {
    return this.vaccineSummaryService.get(dto);
  }
}
