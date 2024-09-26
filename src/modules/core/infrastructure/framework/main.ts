import { CoreModule } from '@core/infrastructure/framework/core.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(CoreModule);
  await app.listen(3000);
}

bootstrap();
