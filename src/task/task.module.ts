import { Module } from '@nestjs/common';

import { TaskController } from './task.controller';

import { TaskService } from './task.service';

import { TaskSchema } from './schema';

import { MongooseModule } from '@nestjs/mongoose';

import { taskRepository, MongoTaskRepository } from './repository';

import { UserSchema } from '../user/schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Task', schema: TaskSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [TaskController],
  providers: [
    TaskService,
    {
      provide: taskRepository,
      useClass: MongoTaskRepository,
    },
  ],
})
export class TaskModule {}
