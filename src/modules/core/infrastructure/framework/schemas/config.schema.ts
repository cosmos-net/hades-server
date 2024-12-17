import Joi from 'joi';

export const configSchema = Joi.object({
  DB_POSTGRES_HOST: Joi.string().required(),
  DB_POSTGRES_PORT: Joi.number().required(),
  DB_POSTGRES_TYPE: Joi.string().required(),
  DB_POSTGRES_USER: Joi.string().required(),
  DB_POSTGRES_PASS: Joi.string().required(),
  DB_POSTGRES_NAME: Joi.string().required(),
  DB_POSTGRES_SSL: Joi.boolean().required(),
  DB_POSTGRES_SYNC: Joi.boolean().required(),
  DB_POSTGRES_AUTO_LOAD: Joi.boolean().required(),
  DB_POSTGRES_RUN_MIGRATIONS: Joi.boolean().required(),
  DB_POSTGRES_LOGGING: Joi.boolean().required(),
  DB_POSTGRES_MIGRATIONS_TABLE_NAME: Joi.string().required(),
});
