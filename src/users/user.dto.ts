import {IsNumber, IsString} from 'class-validator';
import { Role } from '../auth/models/role.model';
import { PartialType } from '@nestjs/mapped-types';

export class createUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  role: Role;
}

export class updateUserDto extends PartialType(createUserDto) {
  @IsNumber()
  id: number;
}
