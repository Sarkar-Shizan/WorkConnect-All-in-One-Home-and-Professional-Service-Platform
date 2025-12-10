import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginServiceProviderDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
