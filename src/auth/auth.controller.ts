import { Controller, Post, Body, HttpCode } from '@nestjs/common';

import { SigninDto, SignupDto } from './dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(
    @Body() signupDto: SignupDto,
  ): Promise<{ user: object; token: string }> {
    return this.authService.signup(signupDto);
  }

  @HttpCode(200)
  @Post('signin')
  signin(
    @Body() signinDto: SigninDto,
  ): Promise<{ user: object; token: string }> {
    return this.authService.signin(signinDto);
  }
}
