import Joi from "joi";
import { appEnvironmentSchema } from "./app.schema";
import { databaseEnvironmentSchema } from "./database.schema";

export const ValidationSchema = [
    appEnvironmentSchema,databaseEnvironmentSchema
].reduce((acc,schema) => acc.concat(schema),Joi.object()); 