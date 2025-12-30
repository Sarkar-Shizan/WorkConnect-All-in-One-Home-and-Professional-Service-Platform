import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCustomerDto } from '../dto/login-customer.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('customer/auth')
export class AuthController {
  constructor(private authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() dto: LoginCustomerDto) {
    const result = await this.authService.login(dto);

  

    return result;
  }

}
