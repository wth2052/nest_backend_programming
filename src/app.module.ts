import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import emailConfig from './config/emailConfig';
import {UsersModule} from './users/users.module';
import {validationSchema} from './config/validationSchema';

@Module({
  imports: [UsersModule, ConfigModule.forRoot({
    envFilePath: [`${__dirname}/config/env/.env`],
    load: [emailConfig],
    isGlobal: true,
    validationSchema,
  }),
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
