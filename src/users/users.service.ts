import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteResult, FindCondition, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { createUserDto, updateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {}

  async getUsers(filter?: FindCondition<User>): Promise<User[]> {
    return await this.usersRepo.find({ where: filter, relations: ['orders'] });
  }

  async create(data: createUserDto): Promise<User> {
    const user = this.usersRepo.create({
      username: data.username,
      password: await bcrypt.hash(data.password, 10),
      role: data.role,
    });
    return await this.usersRepo.save(user);
  }

  async update(data: updateUserDto): Promise<User> {
    const user = await this.usersRepo.findOne(data.id);

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.BAD_REQUEST);
    }

    this.usersRepo.merge(user, data);
    return this.usersRepo.save(user);
  }

  async delete(idArray: []): Promise<DeleteResult> {
    return await this.usersRepo.delete(idArray);
  }
}
