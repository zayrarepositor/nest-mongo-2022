import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private taskModel: Model<TaskDto>) {}

  async getTasks(): Promise<TaskDto[]> {
    return await this.taskModel.find();
  }

  async getTaskById(taskId: string): Promise<TaskDto> {
    return await this.taskModel.findById(taskId);
  }

  async createTask(task: TaskDto): Promise<TaskDto> {
    const newTask = new this.taskModel(task);
    return await newTask.save();
  }

  /*   updateTask(task: CreateTaskDto, taskId: number): string {
    return `task ${taskId} updated`;
  }

  deleteTask(taskId: number): string {
    return 'task deleted';
  } */
}
