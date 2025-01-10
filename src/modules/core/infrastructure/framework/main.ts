import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { CoreModule } from '@core/infrastructure/framework/core.module';
import { HttpExceptionFilter } from '@core/infrastructure/framework/exception-filters/http-exception.filter';
import { MicroserviceExceptionFilter } from '@core/infrastructure/framework/exception-filters/microservice-exception.filter';
import { TimeOutInterceptor } from '@core/infrastructure/framework/globals/timeout-interceptor';
import { TransformInterceptor } from '@core/infrastructure/framework/globals/transform-interceptor.global';
import { ValidationPipeWithExceptionFactory } from '@core/infrastructure/framework/globals/validation-pipe.global';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CoreModule, {
    transport: Transport.NATS,
    options: {
      url: 'nats://localhost:4222',
      queue: 'cats_queue',
    },
  });

  const configService = app.get(ConfigService);
  const natsUrl = configService.get<string>('NATS_URL');

  Logger.log(`NATS URL: ${natsUrl}`);

  app.useGlobalPipes(
    new ValidationPipeWithExceptionFactory(),
    new ValidationPipe({ forbidUnknownValues: true, whitelist: true }),
  );

  app.useGlobalInterceptors(new TransformInterceptor(), new TimeOutInterceptor());
  app.useGlobalFilters(new MicroserviceExceptionFilter(), new HttpExceptionFilter());

  await app.listen();

  process.on('SIGTERM', async (): Promise<void> => {
    await app.close();
    Logger.log('Application gracefully shut down');
  });
}

bootstrap();
