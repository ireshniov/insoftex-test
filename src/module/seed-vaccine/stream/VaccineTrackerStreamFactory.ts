import { VaccineService } from '../../vaccine/service/VaccineService';
import { Readable } from 'stream';
import { Agent as HttpsAgent } from 'https';
import axios from 'axios';
import { ResponseToVaccineTransformStream } from './ResponseToVaccineTransformStream';
import { VaccineWritableStream } from './VaccineWritableStream';

export class VaccineTrackerStreamFactory {
  static async createResponseReadableStream(): Promise<Readable> {
    const httpsAgent: HttpsAgent = new HttpsAgent({
      keepAlive: true,
      rejectUnauthorized: false,
    });

    return (
      await axios.get(
        'https://opendata.ecdc.europa.eu/covid19/vaccine_tracker/csv/data.csv',
        {
          responseType: 'stream',
          httpsAgent,
        },
      )
    ).data;
  }

  static createResponseToVaccineTransformStream(): ResponseToVaccineTransformStream {
    return new ResponseToVaccineTransformStream(1000);
  }

  static createVaccineWritableStream(
    vaccineService: VaccineService,
  ): VaccineWritableStream {
    return new VaccineWritableStream(vaccineService, {
      objectMode: true,
      highWaterMark: 1000,
    });
  }
}
