import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { RoleEnum } from "../Enums/roleEnum";
import { ROLES_KEY } from "../decorators/role";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector:Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this.reflector.getAllAndOverride<RoleEnum>(
            ROLES_KEY, [
                context.getHandler(),
                context.getClass() 
            ]
        )

        if(!requiredRole){
            return true
        }

        const { user } = context.switchToHttp().getRequest()
        return user.role === requiredRole; 
    }
}