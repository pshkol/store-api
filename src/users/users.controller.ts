import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { createUserDto, updateUserDto } from './user.dto';
import { DeleteResult, FindCondition } from 'typeorm';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Public } from '../auth/decorators/public.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/models/role.model';
import { Roles } from '../auth/decorators/role.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Get()
  async getAll(@Body() filter?: FindCondition<User>): Promise<User[]> {
    return this.usersService.getUsers(filter);
  }

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() data: createUserDto): Promise<User> {
    return await this.usersService.create(data);
  }

  @Roles(Role.ADMIN)
  @Patch()
  async update(@Body() data: updateUserDto): Promise<User> {
    return await this.usersService.update(data);
  }

  @Roles(Role.ADMIN)
  @Delete()
  async delete(@Body() idArray: []): Promise<DeleteResult> {
    return await this.usersService.delete(idArray);
  }
}
