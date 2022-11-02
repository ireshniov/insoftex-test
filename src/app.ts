import { INestApplication } from '@nestjs/common';
import { json, urlencoded } from 'express';
import * as compression from 'compression';
import { LoggerService } from './module/common/logger/service/LoggerService';
import { LoggingInterceptor } from './module/common/logger/interceptor/LoggerInterceptor';

/**
 * @todo add swagger here
 */
export async function appBootstrap(
  app: INestApplication,
  _logger: LoggerService,
): Promise<INestApplication> {
  app.use(compression());
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ limit: '1mb', extended: true }));

  app.enableShutdownHooks();
  app.useGlobalInterceptors(new LoggingInterceptor());

  app.enableCors();

  return app;
}
