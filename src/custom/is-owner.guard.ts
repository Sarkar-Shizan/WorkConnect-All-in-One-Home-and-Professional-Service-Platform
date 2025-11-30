import {CanActivate,ExecutionContext,Injectable,ForbiddenException,UnauthorizedException, HttpException} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OWNER_KEY } from './owner.decorator';

@Injectable()
export class IsOwnerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // extracted by JwtAuthGuard
    if (!user) throw new UnauthorizedException('User not authenticated');

    // get which route param represents the ownerId
    const ownerParam = this.reflector.get<string>(OWNER_KEY, context.getHandler());
    if (!ownerParam) return true; // no owner check needed

    const resourceOwnerId = Number(request.params[ownerParam]);

    if (user.id !== resourceOwnerId) {
      throw new HttpException('Forbidden: You do not own this resource', 403);
    }

    return true;
  }
}
