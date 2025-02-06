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
  const app = await NestFactory.create(CoreModule);

  const configService = app.get(ConfigService);

  const natsUrl = configService.get<string>('NATS_URL');
  Logger.log(`NATS URL: ${natsUrl}`);

  const logger = new Logger('Main');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: [natsUrl],
    },
  });

  const rabbitMqUrl = configService.get<string>('RABBIT_MQ_URL');
  const rabbitMqQueue = configService.get<string>('RABBIT_MQ_QUEUE');

  Logger.log(`Rabbit MQ URL: ${rabbitMqUrl}`);
  Logger.log(`Rabbit MQ Queue: ${rabbitMqQueue}`);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitMqUrl],
      queue: rabbitMqQueue,
      queueOptions: {
        durable: true,
      },
    },
  });

  app.useGlobalPipes(
    new ValidationPipeWithExceptionFactory(),
    new ValidationPipe({ forbidUnknownValues: true, whitelist: true }),
  );

  app.useGlobalInterceptors(new TransformInterceptor(), new TimeOutInterceptor());
  app.useGlobalFilters(new MicroserviceExceptionFilter(), new HttpExceptionFilter());

  const port = configService.get<number>('PORT');

  await app.startAllMicroservices();
  await app.listen(port, (): void => logger.log(`Application listening on port ${port}`));

  process.on('SIGTERM', async (): Promise<void> => {
    await app.close();
  });
}

bootstrap();
