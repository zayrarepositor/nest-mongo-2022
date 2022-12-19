import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  HttpCode,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from '../auth/guard';

import { TaskService } from './task.service';

import { ReadTaskDto, CreateTaskDto, UpdateTaskDto } from './dto';

import { User as RequestUser } from '../auth/decorator';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @RequestUser('id') userId: string,
  ): Promise<ReadTaskDto> {
    console.log(userId);
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(@Query() filterQuery: object): Promise<ReadTaskDto[]> {
    return this.taskService.findAll(filterQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ReadTaskDto> {
    return this.taskService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<ReadTaskDto> {
    return this.taskService.update(id, updateTaskDto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    return await this.taskService.remove(id);
  }
}
