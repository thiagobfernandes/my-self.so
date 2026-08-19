import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentModule } from './infrastructure/enviroments/environment.module';
import { DatabaseModule } from './infrastructure/database/typeorm.module';
import { databaseConfiguration } from './infrastructure/database/typeorm-configuration.database';

@Module({
  imports: [EnvironmentModule, DatabaseModule.forRoot(databaseConfiguration())],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
