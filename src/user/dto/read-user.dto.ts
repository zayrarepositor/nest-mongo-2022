import { PartialType } from '@nestjs/mapped-types';

import { IsString } from 'class-validator';

import { SignupDto } from '../../auth/dto';

export class ReadUserDto extends PartialType(SignupDto) {
  @IsString()
  readonly id: string;
}
