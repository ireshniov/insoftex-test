import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import { IVaccine } from '../interface/IVaccine';

@Entity('vaccines')
export class Vaccine implements IVaccine {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  YearWeekISO: string;

  @Column()
  FirstDose: number;

  @Column()
  FirstDoseRefused: number;

  @Column()
  SecondDose: number;

  @Column()
  DoseAdditional1: number;

  @Column()
  DoseAdditional2: number;

  @Column()
  DoseAdditional3: number;

  @Column()
  UnknownDose: number;

  @Column()
  NumberDosesReceived: number;

  @Column()
  NumberDosesExported: number;

  @Column()
  Region: string;

  @Column()
  Population: number;

  @Column()
  ReportingCountry: string;

  @Column()
  TargetGroup: string;

  @Column()
  Vaccine: string;

  @Column()
  Denominator: number;
}
