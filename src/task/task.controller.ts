import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTasks(): Promise<TaskDto[]> {
    return this.taskService.getTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') taskId: string): Promise<TaskDto> {
    return this.taskService.getTaskById(taskId);
  }

  @Post()
  createTask(@Body() task: TaskDto): Promise<TaskDto> {
    return this.taskService.createTask(task);
  }

  /*   @Put()
  updateTask(
    @Body() task: CreateTaskDto,
    @Param('id', ParseIntPipe) taskId: number,
  ): string {
    return this.taskService.updateTask(task, taskId);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) taskId: number): string {
    return this.taskService.deleteTask(taskId);
  } */
}
