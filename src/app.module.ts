import { Module } from '@nestjs/common';

import { TaskModule } from './task/task.module';

import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';

import { configLoader } from './config/config-loader';

import { AuthModule } from './auth/auth.module';

import { MongodbModule } from './mongodb/mongodb.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configLoader], isGlobal: true }),
    TaskModule,
    UserModule,
    AuthModule,
    MongodbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
