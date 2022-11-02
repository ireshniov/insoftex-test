import {
  IsDateString,
  IsEnum,
  IsISO31661Alpha2,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, TransformFnParams, Type } from 'class-transformer';

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
  @IsDateString()
  // @Matches(new RegExp('^\\d{4}-W([1-9]|[1-4][0-9]|5[0-3])$'))
  dateFrom: string;

  @IsNotEmpty()
  // @Matches(new RegExp('^\\d{4}-W([1-9]|[1-4][0-9]|5[0-3])$'))
  @IsDateString()
  dateTo: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform((params: TransformFnParams) => Number(params.value))
  rangeSize: number;

  @Type(() => VaccineSummarySortDto)
  @IsNotEmpty()
  @ValidateNested()
  sort: VaccineSummarySortDto[];
}
