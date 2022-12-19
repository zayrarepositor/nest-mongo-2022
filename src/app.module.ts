import { ConfigService } from '@nestjs/config/dist';

import { Module } from '@nestjs/common';

import { TaskModule } from './task/task.module';

import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';

import { configLoadeer } from './config/config-loader';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configLoadeer], isGlobal: true }),
    TaskModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        return {
          uri: dbConfig.uri,
        };
      },
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
