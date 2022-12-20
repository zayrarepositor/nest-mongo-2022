/* import { Expose } from 'class-transformer'; */
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Length,
  IsBoolean,
  MinLength,
  IsDate,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 25, { message: 'title length: 3 - 25 characteres' })
  readonly title: string;

  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'description min length: 5 characteres' })
  readonly description: string;

  @IsOptional()
  @IsBoolean()
  readonly done: boolean;

  /*  @Expose({ name: 'wroteAt' }) */
  @IsOptional()
  @IsDate()
  readonly wrote: Date;
}
