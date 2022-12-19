import { Injectable } from '@nestjs/common';

import {
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common/exceptions';

import { InjectModel } from '@nestjs/mongoose';

import { LeanDocument } from 'mongoose';

import { TaskRepository } from './task.repository';

import { CreateTaskDto, UpdateTaskDto } from '../dto';

import { Task } from '../entity';

import { TaskDocument, TaskModel } from '../schema';

import { formatter } from 'src/helpers';

@Injectable()
export class MongoTaskRepository implements TaskRepository {
  constructor(@InjectModel('Task') private readonly taskModel: TaskModel) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    try {
      const task = new this.taskModel(createTaskDto);
      console.log('USERID', userId);
      await task.save();

      return this.cleaner(task);
    } catch (error) {
      if (error.code === 11000) {
        const value = formatter(error.keyValue);
        throw new ForbiddenException('Property already exists: ' + value);
      }
      throw new ForbiddenException(error._message);
    }
  }

  async findAll(filterQuery: object): Promise<Task[]> {
    const tasks = await this.taskModel.find(filterQuery);

    if (tasks.length === 0) throw new NotFoundException('tasks not found');

    const tasksToGoOut = tasks.map((task) => {
      return this.cleaner(task);
    });

    return tasksToGoOut;
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id);

    if (!task) throw new NotFoundException('task not found');

    return this.cleaner(task);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskModel.findOneAndUpdate(
      { _id: id },
      updateTaskDto,
      { new: true },
    );
    if (!task) throw new NotFoundException('task not found');
    return this.cleaner(task);
  }

  async remove(id: string): Promise<string> {
    const task = await this.taskModel.deleteOne({ _id: id });

    if (task.deletedCount === 0) throw new NotFoundException('task not found');

    return `task ${id} deleted`;
  }

  cleaner(rawTask: LeanDocument<TaskDocument>): Task {
    const task = new Task();
    task.id = rawTask.id;
    task.title = rawTask.title;
    task.description = rawTask.description;
    task.done = rawTask.done;
    return task;
  }
}
