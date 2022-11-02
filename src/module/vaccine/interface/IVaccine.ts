export interface IVaccine {
  YearWeekISO: string;
  FirstDose: number;
  FirstDoseRefused: number;
  SecondDose: number;
  DoseAdditional1: number;
  DoseAdditional2: number;
  DoseAdditional3: number;
  UnknownDose: number;
  NumberDosesReceived: number;
  NumberDosesExported: number;
  Region: string;
  Population: number;
  ReportingCountry: string;
  TargetGroup: string;
  Vaccine: string;
  Denominator: number;
}
