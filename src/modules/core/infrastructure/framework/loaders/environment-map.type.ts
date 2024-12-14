import { DatabaseType } from '@core/infrastructure/framework/loaders/database.type';

export type EnvironmentMapType = {
  readonly databases: DatabaseType;
};
