import { UpdateUserDto } from '../dto';

import { User } from '../entity';

export const userRepository = 'UserRepository';

export interface UserRepository {
  findAll(filterQuery: object): Promise<User[]>;

  findOne(filterQuery: object): Promise<User>;

  update(id: string, updateUserDto: UpdateUserDto): Promise<User>;

  remove(id: string): Promise<string>;
}
