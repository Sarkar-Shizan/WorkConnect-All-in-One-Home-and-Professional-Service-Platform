import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BookServiceByCustomerDto {
  @IsNumber()
  @IsNotEmpty()
  serviceId: number; // Reference the selected service

  @IsString()
  @IsNotEmpty()
  serviceAddress: string; // Customer-provided address

  @IsString()
  @IsNotEmpty()
  serviceDate: string; // Scheduled date
}
