import {Injectable, UnauthorizedException} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {PayloadModel} from "./models/paylaod.model";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(username, password) {

      const user = await this.userService.getUsers({username}).then(data => data[0]);

      if (!user) {
          throw new UnauthorizedException();
      }

      if (!await bcrypt.compare(password, user.password)) {
          throw new UnauthorizedException();
      }

      const payload: PayloadModel = {
          sub: user.id,
          username: user.username,
          role: user.role
      }

      return payload;
  }
}
