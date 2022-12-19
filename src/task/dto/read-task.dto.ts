import { IsString } from 'class-validator';

import { CreateTaskDto } from './create-task.dto';

export class ReadTaskDto extends CreateTaskDto {
  @IsString()
  readonly id: string;
}
