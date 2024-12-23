import { ConfigModuleOptions } from '@nestjs/config';

import { databasesLoader } from '@core/infrastructure/framework/loaders/database.loader';
import { configSchema } from '@core/infrastructure/framework/schemas/config.schema';

export const mainConfigOptions: ConfigModuleOptions = {
  cache: true,
  isGlobal: true,
  load: [databasesLoader.postgres],
  validationSchema: configSchema,
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
  envFilePath: ['.env.local', '.env.test'],
};
