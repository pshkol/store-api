import {Inject, Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import config from "../../../config";
import {ConfigType} from "@nestjs/config";
import {PayloadModel} from "../models/paylaod.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.jwtSecret,
            ignoreExpiration: false,
        });
    }

    validate(payload: PayloadModel) {
        return payload;
    }

}