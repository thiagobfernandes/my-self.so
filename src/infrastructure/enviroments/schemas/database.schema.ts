import Joi from 'joi';

export const databaseEnvironmentSchema = Joi.object({
  DB_HOST: Joi.string().required().messages({
    'string.base': `"DB_HOST" should be a type of 'text'`,
    'string.empty': `"DB_HOST" cannot be an empty field`,
    'any.required': `"DB_HOST" is a required field`,
  }),
  DB_PORT: Joi.number().default(5432).messages({
    'number.base': `"DB_PORT" should be a type of 'number'`,
    'number.empty': `"DB_PORT" cannot be an empty field`,
    'any.required': `"DB_PORT" is a required field`,
  }),
  DB_USERNAME: Joi.string().required().messages({
    'string.base': `"DB_USERNAME" should be a type of 'text'`,
    'string.empty': `"DB_USERNAME" cannot be an empty field`,
    'any.required': `"DB_USERNAME" is a required field`,
  }),
  DB_PASSWORD: Joi.string().required().messages({
    'string.base': `"DB_PASSWORD" should be a type of 'text'`,
    'string.empty': `"DB_PASSWORD" cannot be an empty field`,
    'any.required': `"DB_PASSWORD" is a required field`,
  }),
  DB_NAME: Joi.string().required().messages({
    'string.base': `"DB_NAME" should be a type of 'text'`,
    'string.empty': `"DB_NAME" cannot be an empty field`,
    'any.required': `"DB_NAME" is a required field`,
  }),
  DB_SYNCHRONIZE: Joi.boolean().default(false).messages({
    'boolean.base': `"DB_SYNCHRONIZE" should be a type of 'boolean'`,
    'boolean.empty': `"DB_SYNCHRONIZE" cannot be an empty field`,
    'any.required': `"DB_SYNCHRONIZE" is a required field`,
  }),
});
