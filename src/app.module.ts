/* import { ConfigModule } from '@nestjs/config'; */
/* import { ConfigService } from '@nestjs/config/dist'; */
import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    /*     ConfigModule.forRoot({ isGlobal: true }), */
    TaskModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
