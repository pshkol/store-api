import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {Reflector} from "@nestjs/core";
import {Role} from "../models/role.model";
import {PUBLIC} from "../decorators/public.decorator";
import {Observable} from "rxjs";

@Injectable()
export class JwtGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
        const isPublic = this.reflector.get<Role>(PUBLIC, context.getHandler());

        if (isPublic) {
            return true;
        }

        return super.canActivate(context);
    }
}