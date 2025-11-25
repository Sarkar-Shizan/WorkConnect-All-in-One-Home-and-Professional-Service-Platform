import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class BookServiceByCustomerDto {
  @IsString()
  @IsNotEmpty()
  serviceCategory: string;

  @IsString()
  @IsNotEmpty()
  serviceAddress: string;

  @IsString()
  @IsNotEmpty()
  serviceDate: string; 

}
