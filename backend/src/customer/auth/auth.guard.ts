import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];

    if (!authHeader) throw new UnauthorizedException('Token missing');

    const token = authHeader.split(' ')[1];
    const decoded = await this.authService.validateToken(token);

    if (!decoded) throw new UnauthorizedException('Invalid token');

    req.user = decoded; 
    return true;
  }
}
