import { Vaccine } from '../entity/Vaccine';
import { Injectable } from '@nestjs/common';
import { DataSource, MongoRepository } from 'typeorm';
import { ISummary } from '../../vaccine-summary/interface/IVaccineSummary';
import { IGetSummary } from '../../vaccine-summary/service/VaccineSummaryService';

@Injectable()
export class VaccineRepository extends MongoRepository<Vaccine> {
  constructor(private dataSource: DataSource) {
    super(Vaccine, dataSource.createEntityManager());
  }

  async getSummary({
    country,
    dateFrom,
    dateTo,
    boundaries,
    sort,
  }: IGetSummary): Promise<ISummary[]> {
    return await this.aggregate<ISummary>(
      [
        {
          $match: {
            ReportingCountry: country,
            YearWeekISO: {
              $gte: dateFrom,
              $lt: dateTo,
            },
          },
        },
        {
          $bucket: {
            groupBy: '$YearWeekISO',
            boundaries,
            output: {
              NumberDosesReceived: {
                $sum: {
                  $toInt: '$NumberDosesReceived',
                },
              },
            },
          },
        },
        {
          $addFields: {
            weekStart: '$_id',
            weekEnd: {
              $arrayElemAt: [
                boundaries,
                {
                  $add: [{ $indexOfArray: [boundaries, '$_id'] }, 1],
                },
              ],
            },
          },
        },
        {
          $project: {
            _id: 0,
            weekStart: 1,
            weekEnd: 1,
            NumberDosesReceived: '$NumberDosesReceived',
          },
        },
        {
          $sort: sort,
        },
      ],
      {
        allowDiskUse: true,
      },
    ).toArray();
  }
}
