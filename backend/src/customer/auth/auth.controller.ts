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

    // Set HttpOnly cookie('access_token' is cookie name)
    res.cookie('access_token', accessToken, {
      httpOnly: true, //js in browser cant read it
      secure: false, //false for HTtP  and true fro HTTPS
      sameSite: 'strict', //cookie is sent only for requests coming from your own domain. ("lax" for normal site to site navigation not for POST reqs.)
      maxAge: 45 * 60 * 1000, //45min in milliseconds
      path: '/', //means cookie for all path
    });

    return { message: 'Login successful' };
  }
  @Post('logout')
  logout(@Res({ passthrough: true }) res: any) {
    // Clear the cookie with '' empty 
    res.cookie('access_token', '', { 
      httpOnly: true,
      secure: false, 
      sameSite: 'strict',
      expires: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago (so the browser will delete the cookie immediately)
      path: '/',
    });

    return { message: 'Logout successful' };
  }
}
