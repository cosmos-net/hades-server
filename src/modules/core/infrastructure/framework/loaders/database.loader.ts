import { registerAs } from '@nestjs/config';

import { configLoader } from '@core/infrastructure/framework/loaders/config.loader';
import { DatabaseType } from '@core/infrastructure/framework/loaders/database.type';

export const databasesLoader = {
  postgres: registerAs(
    'postgres',
    (): DatabaseType['postgres'] => configLoader().databases.postgres,
  ),
};
