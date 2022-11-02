export interface ISummary {
  weekStart: string;
  weekEnd: string;
  NumberDosesReceived: number;
}

export interface IVaccineSummary {
  summary: ISummary[];
}
