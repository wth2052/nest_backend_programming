import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from '../orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema }),
    TypeOrmModule.forRootAsync({
      useClass: OrmConfig,
    }),
    UsersModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
