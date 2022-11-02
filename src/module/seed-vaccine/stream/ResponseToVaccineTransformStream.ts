import { Transform, TransformCallback } from 'stream';
import { IVaccine } from '../../vaccine/interface/IVaccine';
import { IVaccineTrackerResponseRecord } from '../interface/IVaccineTrackerResponseRecord';

export class ResponseToVaccineTransformStream extends Transform {
  private vaccines: IVaccine[] = [];

  constructor(private readonly batchSize: number = 0) {
    super({ objectMode: true });
  }

  _flush(callback: TransformCallback) {
    this._push();
    callback();
  }

  _transform(
    record: IVaccineTrackerResponseRecord,
    _encoding: string,
    callback: (error?: Error | null, data?: any) => void,
  ): void {
    this.vaccines.push({
      YearWeekISO: record.YearWeekISO,
      FirstDose: Number(record.FirstDose),
      FirstDoseRefused: Number(record.FirstDoseRefused),
      SecondDose: Number(record.SecondDose),
      DoseAdditional1: Number(record.DoseAdditional1),
      DoseAdditional2: Number(record.DoseAdditional2),
      DoseAdditional3: Number(record.DoseAdditional3),
      UnknownDose: Number(record.UnknownDose),
      NumberDosesReceived: Number(record.NumberDosesReceived),
      NumberDosesExported: Number(record.NumberDosesExported),
      Region: record.Region,
      Population: Number(record.Population),
      ReportingCountry: record.ReportingCountry,
      TargetGroup: record.TargetGroup,
      Vaccine: record.Vaccine,
      Denominator: Number(record.Denominator),
    });

    if (this.vaccines.length >= this.batchSize) {
      this._push();
    }

    callback();
  }

  private _push() {
    if (this.vaccines.length === 0) {
      return;
    }

    this.push(this.vaccines);

    this.vaccines = [];
  }
}
