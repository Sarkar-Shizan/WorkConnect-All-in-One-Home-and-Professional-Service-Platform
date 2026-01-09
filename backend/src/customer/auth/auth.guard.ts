import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    // Read JWT from HttpOnly cookie instead of Authorization header
    const token = req.cookies?.access_token;

    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    // Validate token
    const decoded = await this.authService.validateToken(token);

    if (!decoded) {
      throw new UnauthorizedException('Invalid token');
    }

    // Attach user info to request
    req.user = decoded;

    return true;
  }
}
