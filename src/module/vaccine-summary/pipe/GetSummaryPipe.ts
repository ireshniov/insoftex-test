import {
  Injectable,
  InternalServerErrorException,
  PipeTransform,
} from '@nestjs/common';
import {
  SortDirectionEnum,
  VaccineSummaryDto,
  VaccineSummarySortDto,
} from '../dto/VaccineSummaryDto';
import { IGetSummary } from '../service/VaccineSummaryService';
import { DateTime } from 'luxon';

@Injectable()
export class GetSummaryPipe
  implements PipeTransform<VaccineSummaryDto, Promise<IGetSummary>>
{
  async transform({
    c,
    dateFrom,
    dateTo,
    rangeSize,
    sort,
  }: VaccineSummaryDto): Promise<IGetSummary> {
    const boundaries: string[] = this.getBoundaries(
      dateFrom,
      dateTo,
      rangeSize,
    );

    if (boundaries.length < 2) {
      throw new InternalServerErrorException(
        'You must specify at least two boundaries',
      );
    }

    return {
      country: c,
      dateFrom,
      dateTo,
      boundaries,
      sort: this.getSort(sort),
    };
  }

  private getBoundaries(
    dateFrom: string,
    dateTo: string,
    rangeSize: number,
  ): string[] {
    const boundaries: string[] = [];

    const endDate = DateTime.fromISO(dateTo, { zone: 'utc' });
    let currentDate = DateTime.fromISO(dateFrom, { zone: 'utc' });

    boundaries.push(this.currentDateFormat(currentDate));

    while (currentDate < endDate) {
      currentDate = currentDate.plus({ week: rangeSize });

      if (currentDate > endDate) {
        currentDate = endDate;
      }

      boundaries.push(this.currentDateFormat(currentDate));
    }

    return boundaries;
  }

  private getSort(sort: VaccineSummarySortDto[]): { [key: string]: -1 | 1 } {
    if (!sort.length) {
      return {
        weekStart: 1,
      };
    }

    const result: { [key: string]: -1 | 1 } = {};

    for (const sortDto of sort) {
      result[sortDto.field] =
        SortDirectionEnum.ASC == sortDto.direction ? 1 : -1;
    }

    return result;
  }

  private currentDateFormat(currentDate: DateTime): string {
    let format = "yyyy-'W'W";

    if (currentDate.weekNumber < 10) {
      format = "yyyy-'W'0W";
    }

    return currentDate.toFormat(format);
  }
}
