export interface IVaccineTrackerResponseRecord {
  YearWeekISO: string;
  FirstDose: string;
  FirstDoseRefused: string;
  SecondDose: string;
  DoseAdditional1: string;
  DoseAdditional2: string;
  DoseAdditional3: string;
  UnknownDose: string;
  NumberDosesReceived: string;
  NumberDosesExported: string;
  Region: string;
  Population: string;
  ReportingCountry: string;
  TargetGroup: string;
  Vaccine: string;
  Denominator: string;
}
