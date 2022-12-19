import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Length,
  IsBoolean,
  IsInt,
  Min,
  Max,
  IsUrl,
} from 'class-validator';

import { SigninDto } from './signin.dto';

export class SignupDto extends SigninDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'name max length: 3 - 20 characteres' })
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(18, { message: 'age must be at least 18' })
  @Max(75, { message: 'age must be lower than 76' })
  age: number;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;

  @IsOptional()
  @IsUrl()
  avatar: string;
}
