import { ConfigService } from '@nestjs/config/dist';

import { Injectable, Inject, ForbiddenException } from '@nestjs/common';

import { SignupDto, SigninDto } from './dto';

import { authRepository } from './repository';

import * as argon from 'argon2';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authRepository) private readonly AuthRepository,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(signupDto: SignupDto): Promise<{ user: object; token: string }> {
    // is it ok to generate hash here?
    const hash = await argon.hash(signupDto.password);

    const user = await this.AuthRepository.signup(signupDto, hash);

    const token = await this.signToken(user._id, user.email);

    return { user, token };
  }

  async signin(signinDto: SigninDto): Promise<{ user: object; token: string }> {
    const user = await this.AuthRepository.signin(signinDto);
    //this validation here??
    if (!user) throw new ForbiddenException('User not found');

    const passwordMatcher = await argon.verify(
      user.password,
      signinDto.password,
    );

    if (passwordMatcher) {
      const token = await this.signToken(user._id, user.email);
      return { user, token };
    } else {
      throw new ForbiddenException('Incorrect credentials');
    }
  }

  signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('jwtSecret');

    return this.jwt.signAsync(payload, {
      expiresIn: '72h',
      secret,
    });
  }
}
