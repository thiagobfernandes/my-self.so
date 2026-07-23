import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { appEnvironmentSchema } from "./schemas/app.schema";
import { appConfig } from "./registers/app.register";


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: appEnvironmentSchema,
            validationOptions: {
                abortEarly: false,
            },
            load: [appConfig]
        })
    ],
    exports: []
})
export class EnvironmentModule { }