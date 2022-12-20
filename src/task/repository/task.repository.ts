import { ObjectId } from 'mongoose';
import { CreateTaskDto, UpdateTaskDto } from '../dto';

import { Task } from '../entity';

export const taskRepository = 'TaskRepository';

export interface TaskRepository {
  create(createTaskDto: CreateTaskDto, userId: string): Promise<Task>;

  findAll(filterQuery: object): Promise<Task[]>;

  findOne(id: string): Promise<Task>;

  update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task>;

  remove(id: string): Promise<string>;
}
