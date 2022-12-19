import { Module } from '@nestjs/common';

import { UserService } from './user.service';

import { UserController } from './user.controller';

import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './schema';

import { userRepository, MongoUserRepository } from './repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: userRepository, useClass: MongoUserRepository },
  ],
})
export class UserModule {}
