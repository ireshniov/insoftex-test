import {
  Allow,
  IsEnum,
  IsISO31661Alpha2,
  IsNotEmpty,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsVaccineSummaryDate } from '../validator/IsVaccineSummaryDate';

export enum SortFieldEnum {
  NUMBER_DOSES_RECEIVED = 'NumberDosesReceived',
  WEEK_START = 'weekStart',
}

export enum SortDirectionEnum {
  ASC = 'ascending',
  DESC = 'descending',
}

export class VaccineSummarySortDto {
  @IsNotEmpty()
  @IsEnum(SortFieldEnum)
  field: SortFieldEnum;

  @IsNotEmpty()
  @IsEnum(SortDirectionEnum)
  direction: SortDirectionEnum;
}

export class VaccineSummaryDto {
  @IsNotEmpty()
  @IsString()
  @IsISO31661Alpha2()
  c: string;

  @IsNotEmpty()
  @IsVaccineSummaryDate({
    greaterThanOrEqual: '2020-W53',
    isBefore: 'dateTo',
  })
  dateFrom: string;

  @IsNotEmpty()
  @IsVaccineSummaryDate({ greaterThanOrEqual: '2020-W53' })
  dateTo: string;

  @IsNotEmpty()
  @IsPositive()
  @Transform((params: TransformFnParams) => Number(params.value))
  rangeSize: number;

  @Type(() => VaccineSummarySortDto)
  @IsNotEmpty()
  @ValidateNested()
  sort: VaccineSummarySortDto[];
}
