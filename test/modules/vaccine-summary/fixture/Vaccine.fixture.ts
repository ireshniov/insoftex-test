import { Vaccine } from '../../../../src/module/vaccine/entity/Vaccine';
import { plainToInstance } from 'class-transformer';
import { IVaccine } from '../../../../src/module/vaccine/interface/IVaccine';

const vaccineDto: IVaccine[] = [];

for (let i = 1; i <= 52; i++) {
  let YearWeekISO = `2021-W${i}`;

  if (i <= 9) {
    YearWeekISO = `2021-W0${i}`;
  }
  vaccineDto.push(
    {
      YearWeekISO,
      FirstDose: 0,
      FirstDoseRefused: 0,
      SecondDose: 0,
      DoseAdditional1: 0,
      DoseAdditional2: 0,
      DoseAdditional3: 0,
      UnknownDose: 0,
      NumberDosesReceived: i * 100000,
      NumberDosesExported: 0,
      Region: 'AT',
      Population: i * 100000,
      ReportingCountry: 'AT',
      TargetGroup: `ALL`,
      Vaccine: `Vaccine${i}`,
      Denominator: i,
    },
    {
      YearWeekISO,
      FirstDose: 0,
      FirstDoseRefused: 0,
      SecondDose: 0,
      DoseAdditional1: 0,
      DoseAdditional2: 0,
      DoseAdditional3: 0,
      UnknownDose: 0,
      NumberDosesReceived: i * 100000,
      NumberDosesExported: 0,
      Region: 'AT',
      Population: i * 100000,
      ReportingCountry: 'AT',
      TargetGroup: 'Age<18',
      Vaccine: `Vaccine${i}`,
      Denominator: i,
    },
    {
      YearWeekISO,
      FirstDose: 0,
      FirstDoseRefused: 0,
      SecondDose: 0,
      DoseAdditional1: 0,
      DoseAdditional2: 0,
      DoseAdditional3: 0,
      UnknownDose: 0,
      NumberDosesReceived: i * 100000,
      NumberDosesExported: 0,
      Region: 'AT',
      Population: i * 100000,
      ReportingCountry: 'AT',
      TargetGroup: `HCW`,
      Vaccine: `Vaccine${i}`,
      Denominator: i,
    },
  );
}

export const vaccines: Vaccine[] = plainToInstance(Vaccine, vaccineDto, {
  ignoreDecorators: true,
});
