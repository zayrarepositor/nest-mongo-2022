import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { LeanDocument } from 'mongoose';

import { UserModel, UserDocument } from 'src/user/schema';

import { SignupAuth, SigninAuth } from '../entity';

import { AuthRepository } from './auth.repository';

import { SignupDto, SigninDto } from '../dto';

import { ForbiddenException } from '@nestjs/common/exceptions';

import { formatter } from '../../helpers';

@Injectable()
export class MongoAuthRepository implements AuthRepository {
  constructor(@InjectModel('User') private readonly userModel: UserModel) {}
  //validations here??
  async signup(signupDto: SignupDto, hash: string): Promise<SignupAuth> {
    try {
      const user = new this.userModel(signupDto);

      user.password = hash;

      await user.save();

      return this.signupCleaner(user);
    } catch (error) {
      if (error.code === 11000) {
        const value = formatter(error.keyValue);

        throw new ForbiddenException('Property already exists: ' + value);
      }
      throw new ForbiddenException(error._message);
    }
  }

  async signin(signinDto: SigninDto): Promise<SigninAuth> {
    return await this.userModel.findOne({ email: signinDto.email });
  }

  signupCleaner(rawUser: LeanDocument<UserDocument>): SignupAuth {
    const user = new SignupAuth();
    user.id = rawUser.id;
    user.name = rawUser.name;
    user.age = rawUser.age;
    user.email = rawUser.email;
    user.isActive = rawUser.isActive;
    user.isAdmin = rawUser.isAdmin;
    user.avatar = rawUser.avatar;

    return user;
  }

  signinCleaner(rawUser: LeanDocument<UserDocument>): SigninAuth {
    const user = new SigninAuth();
    user.id = rawUser.id;
    user.name = rawUser.name;
    user.age = rawUser.age;
    user.email = rawUser.email;
    user.isActive = rawUser.isActive;
    user.isAdmin = rawUser.isAdmin;
    user.avatar = rawUser.avatar;
    user.tasks = rawUser.tasks;

    return user;
  }
}
