import {SetMetadata} from "@nestjs/common";

export const ROLES = 'roles';
export const Roles = (...roles) => SetMetadata(ROLES, roles);