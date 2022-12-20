import { ConfigModule, ConfigService } from '@nestjs/config';

import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { configLoader } from '../config/config-loader';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configLoader], isGlobal: true }),
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
  ],
})
export class MongodbModule {}
