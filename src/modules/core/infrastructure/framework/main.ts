import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { CoreModule } from './core.module';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from '@core/infrastructure/framework/globals/transform-interceptor.global';
import { ValidationPipeWithExceptionFactory } from '@core/infrastructure/framework/globals/validation-pipe.global';
import { MicroserviceExceptionFilter } from './exception-filters/microservice-exception.filter';
import { HttpExceptionFilter } from './exception-filters/http-exception.filter';
import { TimeOutInterceptor } from './globals/timeout-interceptor';


async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CoreModule, {
    transport: Transport.NATS,
    options: {
      url: 'nats://localhost:4222',
      queue: 'cats_queue',
    },
  });
  // const app = await NestFactory.create(CoreModule);

  const configService = app.get(ConfigService);
  const natsUrl = configService.get<string>('NATS_URL');
  // const port = configService.get<number>('PORT');

  Logger.log(`NATS URL: ${natsUrl}`);
  // Logger.log(`PORT: ${port}`);

  app.useGlobalPipes(
    new ValidationPipeWithExceptionFactory(),
    new ValidationPipe({ forbidUnknownValues: true, whitelist: true }),
  );

  app.useGlobalInterceptors(new TransformInterceptor(), new TimeOutInterceptor());
  app.useGlobalFilters(new MicroserviceExceptionFilter(), new HttpExceptionFilter());

  // await app.startAllMicroservices();
  // await app.listen(port);

  await app.listen();

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    await app.close();
    Logger.log('Application gracefully shut down');
  });
}

bootstrap();