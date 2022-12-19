import { Injectable } from '@nestjs/common';

import { NotFoundException } from '@nestjs/common/exceptions';

import { InjectModel } from '@nestjs/mongoose';

import { LeanDocument } from 'mongoose';

import { UserRepository } from './user.repository';

import { UpdateUserDto } from '../dto';

import { User } from '../entity';

import { UserDocument, UserModel } from '../schema';

@Injectable()
export class MongoUserRepository implements UserRepository {
  constructor(@InjectModel('User') private readonly userModel: UserModel) {}

  async findAll(filterQuery: object): Promise<User[]> {
    const users = await this.userModel.find(filterQuery);

    if (users.length === 0) throw new NotFoundException('users not found');

    const usersToGoOut = users.map((user) => {
      return this.getReadyToGoOut(user);
    });

    return usersToGoOut;
  }

  async findOne(filterQuery: object): Promise<User> {
    const user = await this.userModel.findOne(filterQuery);

    if (!user) throw new NotFoundException('task not found');

    return this.getReadyToGoOut(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { _id: id },
      updateUserDto,
      { new: true },
    );
    if (!user) throw new NotFoundException('user not found');
    return this.getReadyToGoOut(user);
  }

  async remove(id: string): Promise<string> {
    const user = await this.userModel.deleteOne({ _id: id });

    if (user.deletedCount === 0) throw new NotFoundException('user not found');

    return `user id: ${id} deleted`;
  }

  getReadyToGoOut(rawUser: LeanDocument<UserDocument>): User {
    const user = new User();
    user.id = rawUser.id;
    user.name = rawUser.name;
    user.age = rawUser.age;
    user.email = rawUser.email;
    user.password = rawUser.password;
    user.isActive = rawUser.isActive;
    user.isAdmin = rawUser.isAdmin;
    user.avatar = rawUser.avatar;
    user.tasks = rawUser.tasks;
    return user;
  }
}
