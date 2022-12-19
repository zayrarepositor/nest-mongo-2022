import { ConfigService } from '@nestjs/config/dist';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { PassportStrategy } from '@nestjs/passport';

import { Injectable, Inject } from '@nestjs/common';
// userRepository?
import { userRepository } from '../../user/repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(userRepository) private readonly UserRepository,
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('jwtSecret'),
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.UserRepository.findOne({
      id: payload.sub,
    });

    return user;
  }
}
