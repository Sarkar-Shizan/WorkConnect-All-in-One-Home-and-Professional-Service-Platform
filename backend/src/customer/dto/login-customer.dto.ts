import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginCustomerDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
