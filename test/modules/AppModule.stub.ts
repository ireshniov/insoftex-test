import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { appBootstrap } from '../../src/app';
import { AppModule, appModuleMetadata } from '../../src/module/AppModule';
import { LoggerService } from '../../src/module/common/logger/service/LoggerService';

export function createIntegrationTestingModuleBuilder(): TestingModuleBuilder {
  return Test.createTestingModule(appModuleMetadata);
}

export const createUnitTestingModule: () => Promise<TestingModule> =
  async (): Promise<TestingModule> => {
    const testingBuilder: TestingModuleBuilder =
      Test.createTestingModule(appModuleMetadata);

    return testingBuilder.compile();
  };

export const createTestingApp: (
  testingModuleBuilder: TestingModuleBuilder,
) => Promise<INestApplication> = async (
  testingModuleBuilder: TestingModuleBuilder,
): Promise<INestApplication> => {
  const moduleFixture: TestingModule = await testingModuleBuilder.compile();

  const app: INestApplication = moduleFixture.createNestApplication();
  const logger: LoggerService = new LoggerService(AppModule.name);

  await appBootstrap(app, logger);

  return app.init();
};
