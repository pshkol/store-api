import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {PassportModule} from "@nestjs/passport";
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {DatabaseModule} from "../database/database.module";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtModule, JwtService} from "@nestjs/jwt";
import config from '../../config';
import { ConfigType } from '@nestjs/config';
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: { expiresIn: '1d' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
