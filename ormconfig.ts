import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

// Determina el archivo de configuración a cargar
const envFile = fs.existsSync('.env.local') ? '.env.local' : '.env.docker';

// Carga las variables de entorno desde el archivo adecuado
dotenv.config({ path: envFile });

console.log(`process.env.DB_POSTGRES_HOST: ${process.env.DB_POSTGRES_HOST}`);
console.log(`process.env.DB_POSTGRES_PORT: ${process.env.DB_POSTGRES_PORT}`);
console.log(`process.env.DB_POSTGRES_USER: ${process.env.DB_POSTGRES_USER}`);
console.log(`process.env.DB_POSTGRES_PASS: ${process.env.DB_POSTGRES_PASS}`);
console.log(`process.env.DB_POSTGRES_NAME: ${process.env.DB_POSTGRES_NAME}`);
console.log(`process.env.DB_POSTGRES_SYNC: ${process.env.DB_POSTGRES_SYNC}`);
console.log(`process.env.DB_POSTGRES_LOGGING: ${process.env.DB_POSTGRES_LOGGING}`);
console.log(`process.env.DB_POSTGRES_SSL: ${process.env.DB_POSTGRES_SSL}`);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_POSTGRES_HOST,
  port: parseInt(process.env.DB_POSTGRES_PORT, 10),
  username: process.env.DB_POSTGRES_USER,
  password: process.env.DB_POSTGRES_PASS,
  database: process.env.DB_POSTGRES_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
  synchronize: process.env.DB_POSTGRES_SYNC === 'true',
  logging: process.env.DB_POSTGRES_LOGGING === 'true',
  ssl: process.env.DB_POSTGRES_SSL === 'true',
});