import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { removeBearer } from '../utils/bearer-remove';
import { LoginPayload } from '../auth/dtos/login-payload.dto';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserType } from '../user/enums/user-type.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }
    
    const { authorization } = context.switchToHttp().getRequest().headers;

    let token =  await removeBearer(authorization);
    

    const loginPayload: LoginPayload | undefined = await this.jwtService
      .verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })
      .catch(() => undefined);

    if (!loginPayload) {
      return false;
    }

    return requiredRoles.some((role) => role === loginPayload.typeUser);
  }
}