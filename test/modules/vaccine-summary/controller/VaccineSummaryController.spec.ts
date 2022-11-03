import { TestingModuleBuilder } from '@nestjs/testing';
import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import {
  createIntegrationTestingModuleBuilder,
  createTestingApp,
} from '../../AppModule.stub';
import { VaccineRepository } from '../../../../src/module/vaccine/repository/VaccineRepository';
import { vaccines } from '../fixture/Vaccine.fixture';

describe('VaccineSummaryController', () => {
  let moduleBuilder: TestingModuleBuilder;
  let app: INestApplication;
  let vaccineRepository: VaccineRepository;

  beforeEach(async () => {
    moduleBuilder = createIntegrationTestingModuleBuilder();
    app = await createTestingApp(moduleBuilder);
    vaccineRepository = app.get(VaccineRepository);

    await vaccineRepository.save(vaccines);
  });

  afterEach(async () => {
    await vaccineRepository.clear();
    await app.close();
  });

  describe('get', () => {
    it('Should return 400 Bad request', async (): Promise<any> => {
      return request(app.getHttpServer())
        .get(`/vaccine-summary`)
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
          statusCode: 400,
          message: [
            {
              property: 'c',
              children: [],
              constraints: {
                isISO31661Alpha2: 'c must be a valid ISO31661 Alpha2 code',
                isString: 'c must be a string',
                isNotEmpty: 'c should not be empty',
              },
            },
            {
              property: 'dateFrom',
              children: [],
              constraints: {
                isVaccineSummaryDate: 'dateFrom is invalid ISO string.',
                isNotEmpty: 'dateFrom should not be empty',
              },
            },
            {
              property: 'dateTo',
              children: [],
              constraints: {
                isVaccineSummaryDate: 'dateTo is invalid ISO string.',
                isNotEmpty: 'dateTo should not be empty',
              },
            },
            {
              property: 'rangeSize',
              children: [],
              constraints: {
                isPositive: 'rangeSize must be a positive number',
                isNotEmpty: 'rangeSize should not be empty',
              },
            },
            {
              property: 'sort',
              children: [],
              constraints: {
                isNotEmpty: 'sort should not be empty',
              },
            },
          ],
          error: 'Bad Request',
        });
    });

    it('Should return 200 with empty result', async (): Promise<any> => {
      return request(app.getHttpServer())
        .get(
          `/vaccine-summary?c=MD&dateFrom=2021-W01&dateTo=2021-W52&rangeSize=5&sort[0][field]=NumberDosesReceived&sort[0][direction]=descending&sort[1][field]=weekStart&sort[1][direction]=ascending`,
        )
        .expect(HttpStatus.OK)
        .expect({
          summary: [],
        });
    });

    it('Should return 200', async (): Promise<any> => {
      return request(app.getHttpServer())
        .get(
          `/vaccine-summary?c=AT&dateFrom=2021-W01&dateTo=2021-W52&rangeSize=5&sort[0][field]=NumberDosesReceived&sort[0][direction]=descending&sort[1][field]=weekStart&sort[1][direction]=ascending`,
        )
        .expect(HttpStatus.OK)
        .expect({
          summary: [
            {
              weekStart: '2021-W46',
              weekEnd: '2021-W51',
              NumberDosesReceived: 72000000,
            },
            {
              weekStart: '2021-W41',
              weekEnd: '2021-W46',
              NumberDosesReceived: 64500000,
            },
            {
              weekStart: '2021-W36',
              weekEnd: '2021-W41',
              NumberDosesReceived: 57000000,
            },
            {
              weekStart: '2021-W31',
              weekEnd: '2021-W36',
              NumberDosesReceived: 49500000,
            },
            {
              weekStart: '2021-W26',
              weekEnd: '2021-W31',
              NumberDosesReceived: 42000000,
            },
            {
              weekStart: '2021-W21',
              weekEnd: '2021-W26',
              NumberDosesReceived: 34500000,
            },
            {
              weekStart: '2021-W16',
              weekEnd: '2021-W21',
              NumberDosesReceived: 27000000,
            },
            {
              weekStart: '2021-W11',
              weekEnd: '2021-W16',
              NumberDosesReceived: 19500000,
            },
            {
              weekStart: '2021-W51',
              weekEnd: '2021-W52',
              NumberDosesReceived: 15300000,
            },
            {
              weekStart: '2021-W06',
              weekEnd: '2021-W11',
              NumberDosesReceived: 12000000,
            },
            {
              weekStart: '2021-W01',
              weekEnd: '2021-W06',
              NumberDosesReceived: 4500000,
            },
          ],
        });
    });
  });
});
