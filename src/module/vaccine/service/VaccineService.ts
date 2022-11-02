import { Injectable } from '@nestjs/common';
import { VaccineRepository } from '../repository/VaccineRepository';
import { IVaccine } from '../interface/IVaccine';
import { Vaccine } from '../entity/Vaccine';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class VaccineService {
  constructor(private readonly vaccineRepository: VaccineRepository) {}

  async addMany(vaccines: IVaccine[]): Promise<void> {
    const vaccinesToAdd: Vaccine[] = plainToInstance(Vaccine, vaccines);

    await this.vaccineRepository.insertMany(vaccinesToAdd);
  }

  async removeAll(): Promise<void> {
    await this.vaccineRepository.deleteMany({});
  }
}
