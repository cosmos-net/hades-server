import { EnvironmentMapType } from '@core/infrastructure/framework/loaders/environment-map.type';

export const configLoader = (): EnvironmentMapType => ({
  databases: {
    postgres: {
      name: process.env.DB_POSTGRES_NAME,
      host: process.env.DB_POSTGRES_HOST,
      port: parseInt(process.env.DB_POSTGRES_PORT, 10),
      type: process.env.DB_POSTGRES_TYPE,
      username: process.env.DB_POSTGRES_USER,
      password: process.env.DB_POSTGRES_PASS,
      autoLoadEntities: process.env.DB_POSTGRES_AUTO_LOAD === 'true',
      synchronize: process.env.DB_POSTGRES_SYNC === 'true',
      logging: process.env.DB_POSTGRES_LOGGING === 'true',
      runMigrations: process.env.DB_POSTGRES_RUN_MIGRATIONS === 'true',
      migrationsTableName: process.env.DB_POSTGRES_MIGRATIONS_TABLE_NAME,
      tls: process.env.DB_POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : false,
    },
  },
});
