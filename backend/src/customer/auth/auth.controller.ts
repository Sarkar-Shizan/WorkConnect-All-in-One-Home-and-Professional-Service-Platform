import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCustomerDto } from '../dto/login-customer.dto';

@Controller('customer/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Login route
  @Post('login')
  async login(
    @Body() dto: LoginCustomerDto,
    @Res({ passthrough: true }) res: any,
  ) {
    const { accessToken } = await this.authService.login(dto);

    // Set HttpOnly cookie
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      path: '/',
    });

    return { message: 'Login successful' };
  }
  @Post('logout')
  logout(@Res({ passthrough: true }) res: any) {
    // Clear the cookie
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: false, // true in production
      sameSite: 'strict',
      expires: new Date(0),
      path: '/',
    });

    return { message: 'Logout successful' };
  }
}
