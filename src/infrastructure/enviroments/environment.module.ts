import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './registers/app.register';
import { ValidationSchema } from './schemas';
import { databaseConfig } from './registers/database.register';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: ValidationSchema,
      validationOptions: {
        abortEarly: false,
      },
      load: [appConfig, databaseConfig],
    }),
  ],
  exports: [],
})
export class EnvironmentModule {}
