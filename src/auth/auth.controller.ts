import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LoginGuard } from './guards/login.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @UseGuards(LoginGuard)
  @Post()
  login(@Req() req) {
    return {
      access_token: this.jwtService.sign(req.user),
    };
  }
}
