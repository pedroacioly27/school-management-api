import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private allowedRoles: string[]) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getNext();

    const user = request.user;

    if (!user) {
      throw new ForbiddenException();
    }

    const hasPermission = this.allowedRoles.includes(user.roles);

    if (!hasPermission) {
      throw new ForbiddenException();
    }

    return true;
  }
}
