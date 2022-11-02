import { Writable, WritableOptions } from 'stream';
import { VaccineService } from '../../vaccine/service/VaccineService';
import { IVaccine } from '../../vaccine/interface/IVaccine';

export class VaccineWritableStream extends Writable {
  constructor(
    private vaccineService: VaccineService,
    options?: WritableOptions,
  ) {
    super(options);
  }

  async _write(vaccines: IVaccine[], _encoding: BufferEncoding, callback) {
    await this.vaccineService.addMany(vaccines);

    callback(null);
  }
}
