import { IsNotEmpty, IsNumber, IsString, IsPositive } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  serviceName: string;

  @IsString()
  @IsNotEmpty()
  providerName: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;
}
