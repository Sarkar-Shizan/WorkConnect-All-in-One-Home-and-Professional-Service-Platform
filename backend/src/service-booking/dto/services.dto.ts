// dto/create-service.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  serviceTitle: string;

  @IsNotEmpty()
  @IsString()
  serviceCategory: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  companyName: string;
}
