import { Inject, Injectable } from '@nestjs/common';
import { appConfig } from './infrastructure/enviroments/registers/app.register';
import  type { ConfigType }  from '@nestjs/config';

@Injectable()
export class AppService {
  constructor( @Inject(appConfig.KEY ) private readonly config: ConfigType<typeof appConfig>) {}

  getHello(): string {
    const port = this.config.port
    const env = this.config.nodeEnv
    console.log(`Application is running on port: ${port} in ${env} environment`);
    return 'Hello World!';
  }
}
