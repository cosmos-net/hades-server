import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { CoreModule } from '@core/infrastructure/framework/core.module';
import { ExceptionFilter } from '@core/infrastructure/framework/globals/exception-filter.global';
import { TimeOutInterceptor } from '@core/infrastructure/framework/globals/timeout-interceptor';
import { TransformInterceptor } from '@core/infrastructure/framework/globals/transform-interceptor.global';
import { ValidationPipeWithExceptionFactory } from '@core/infrastructure/framework/globals/validation-pipe.global';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(CoreModule);

  const configService = app.get(ConfigService);
  const natsUrl = configService.get<string>('NATS_URL');
  const port = configService.get<number>('PORT');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      url: natsUrl || 'nats://localhost:4222',
    },
  });

  app.useGlobalPipes(
    new ValidationPipeWithExceptionFactory(),
    new ValidationPipe({ forbidUnknownValues: true }),
  );

  app.useGlobalInterceptors(new TransformInterceptor(), new TimeOutInterceptor());
  app.useGlobalFilters(new ExceptionFilter(configService));

  await app.startAllMicroservices();
  await app.listen(port);
}

bootstrap();
