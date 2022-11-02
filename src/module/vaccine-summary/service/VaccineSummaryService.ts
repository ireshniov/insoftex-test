import { Injectable } from '@nestjs/common';
import { ISummary, IVaccineSummary } from '../interface/IVaccineSummary';
import { VaccineRepository } from '../../vaccine/repository/VaccineRepository';

export interface IGetSummary {
  country: string;
  dateFrom: string;
  dateTo: string;
  boundaries: string[];
  sort: { [key: string]: -1 | 1 };
}

@Injectable()
export class VaccineSummaryService {
  constructor(private readonly vaccineRepository: VaccineRepository) {}

  async get(getSummary: IGetSummary): Promise<IVaccineSummary> {
    const summary: ISummary[] = await this.vaccineRepository.getSummary(
      getSummary,
    );

    return {
      summary,
    };
  }
}
