import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import app from 'firebase-admin';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const idToken =
      request?.headers?.authorization &&
      request?.headers?.authorization.split(' ')[1];
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    const claims = await app.auth().verifyIdToken(idToken);

    if (claims.role === permissions[0]) {
      request['user'] = claims;
      return true;
    }

    throw new UnauthorizedException();
  }
}