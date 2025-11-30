import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCustomerDto } from '../dto/login-customer.dto';

@Controller('customer/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() dto: LoginCustomerDto) {
    return this.authService.login(dto);
  }



}
