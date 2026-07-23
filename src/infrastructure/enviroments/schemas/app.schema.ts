import  * as Joi from 'joi';

export const appEnvironmentSchema = Joi.object({
 NODE_ENV: Joi.string().valid('dev', 'prd', 'hmg').default('dev').messages({
    'string.base': `"NODE_ENV" should be a type of 'text'`,
    'string.empty': `"NODE_ENV" cannot be an empty field`,
    'any.required': `"NODE_ENV" is a required field`,
 }),
PORT: Joi.number().default(3000).messages({
    'number.base': `"PORT" should be a type of 'number'`,
    'number.empty': `"PORT" cannot be an empty field`,
    'any.required': `"PORT" is a required field`,
}),
}) 