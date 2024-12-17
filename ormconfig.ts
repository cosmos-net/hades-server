import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

// Determina el archivo de configuración a cargar
const envFile = fs.existsSync('.env.local') ? '.env.local' : '.env.docker';

// Carga las variables de entorno desde el archivo adecuado
dotenv.config({ path: envFile });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_POSTGRES_HOST,
  port: parseInt(process.env.DB_POSTGRES_PORT, 10),
  username: process.env.DB_POSTGRES_USER,
  password: process.env.DB_POSTGRES_PASS,
  database: process.env.DB_POSTGRES_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: process.env.DB_POSTGRES_SYNC === 'true',
  logging: process.env.DB_POSTGRES_LOGGING === 'true',
  ssl: process.env.DB_POSTGRES_SSL === 'true',
});