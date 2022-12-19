import { Injectable, Inject } from '@nestjs/common';

import { ReadTaskDto, CreateTaskDto, UpdateTaskDto } from './dto';

import { taskRepository } from './repository';

@Injectable()
export class TaskService {
  constructor(@Inject(taskRepository) private readonly TaskRepository) {}

  async create(createTaskDto: CreateTaskDto): Promise<ReadTaskDto> {
    return await this.TaskRepository.create(createTaskDto);
  }

  async findAll(filterQuery: object): Promise<ReadTaskDto[]> {
    return await this.TaskRepository.findAll(filterQuery);
  }

  async findOne(id: string): Promise<ReadTaskDto> {
    return await this.TaskRepository.findOne(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<ReadTaskDto> {
    return await this.TaskRepository.update(id, updateTaskDto);
  }

  async remove(id: string): Promise<string> {
    return await this.TaskRepository.remove(id);
  }
}
