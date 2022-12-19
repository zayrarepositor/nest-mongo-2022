import { Inject, Injectable } from '@nestjs/common';

import { ReadUserDto } from './dto/read-user.dto';

import { UpdateUserDto } from './dto/update-user.dto';

import { userRepository } from './repository';

@Injectable()
export class UserService {
  constructor(@Inject(userRepository) private readonly UserRepository) {}

  async findAll(filterQuery: object): Promise<ReadUserDto[]> {
    return await this.UserRepository.findAll(filterQuery);
  }

  async findOne(id: string): Promise<ReadUserDto> {
    return await this.UserRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<ReadUserDto> {
    return await this.UserRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<string> {
    return await this.UserRepository.remove(id);
  }
}
