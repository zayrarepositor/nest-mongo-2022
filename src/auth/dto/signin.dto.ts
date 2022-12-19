import {
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,
  Matches,
  MaxLength,
} from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'password min length: 8 characteres' })
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password must contains at least 1 upper case letter, 1 lower case letter and 1 number or special character',
  })
  password: string;
}
