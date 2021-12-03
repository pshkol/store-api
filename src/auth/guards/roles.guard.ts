import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";
import {ROLES} from "../decorators/role.decorator";
import {Role} from "../models/role.model";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const acceptedRoles: Role[] = this.reflector.get(ROLES, context.getHandler());

        if (!acceptedRoles) {
            return true;
        }

        const userRole: string = context.switchToHttp().getRequest().user.role;

        const isAuth: boolean = acceptedRoles.some(role => role === userRole);


        return isAuth;
    }

}