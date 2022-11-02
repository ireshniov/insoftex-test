import { Injectable } from '@nestjs/common';
import { VaccineService } from '../../vaccine/service/VaccineService';
import { parse } from 'csv-parse';
import { VaccineTrackerStreamFactory } from '../stream/VaccineTrackerStreamFactory';

@Injectable()
export class SeedVaccineService {
  constructor(private readonly vaccineService: VaccineService) {}

  async seed(): Promise<void> {
    await this.vaccineService.removeAll();

    const stream =
      await VaccineTrackerStreamFactory.createResponseReadableStream();

    return new Promise(async (resolve, reject) => {
      stream
        .pipe(parse({ columns: true }))
        .pipe(
          VaccineTrackerStreamFactory.createResponseToVaccineTransformStream(),
        )
        .pipe(
          VaccineTrackerStreamFactory.createVaccineWritableStream(
            this.vaccineService,
          ),
        )
        .on('error', reject)
        .on('finish', resolve);
    });
  }
}
