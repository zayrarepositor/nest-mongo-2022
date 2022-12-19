import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';

import { UserService } from '../user/user.service';

import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from '../user/schema';

import { AuthController } from './auth.controller';

// authRepository & userRepository ??
import { authRepository, MongoAuthRepository } from './repository';

import { userRepository, MongoUserRepository } from '../user/repository';

import { JwtStrategy } from './strategy/jwt.strategy';

import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: authRepository, useClass: MongoAuthRepository },
    UserService,
    { provide: userRepository, useClass: MongoUserRepository },
    JwtStrategy,
  ],
})
export class AuthModule {}
