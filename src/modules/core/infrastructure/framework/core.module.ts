import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DefaultNamingStrategy } from 'typeorm';

import { databasesLoader } from '@core/infrastructure/framework/loaders/database.loader';
import { PostgresType } from '@core/infrastructure/framework/loaders/postgres.type';
import { mainConfigOptions } from '@core/infrastructure/framework/options/config.options';
import { RoleModule } from '@role/infrastructure/framework/role.module';
import { UserModule } from '@user/infrastructure/framework/user.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    ConfigModule.forRoot(mainConfigOptions),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databasesLoader.postgres)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleAsyncOptions => {
        const db = configService.get<PostgresType>('postgres');
        const namingStrategy = new DefaultNamingStrategy();

        return {
          type: db.type,
          host: db.host,
          port: db.port,
          username: db.username,
          password: db.password,
          database: db.name,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: db.synchronize,
          autoLoadEntities: db.autoLoadEntities,
          migrationsTableName: db.migrationsTableName,
          logging: db.logging,
          legacySpatialSupport: db.legacySpatialSupport,
          ssl: db.tls,
          namingStrategy,
        } as TypeOrmModuleAsyncOptions;
      },
    }),
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class CoreModule {}
