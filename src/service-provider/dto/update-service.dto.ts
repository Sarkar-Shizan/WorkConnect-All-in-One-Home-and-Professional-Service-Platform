import { IsOptional, IsString } from 'class-validator';

export class UpdateServiceDto {
  @IsOptional()
  @IsString()
  serviceTitle: string;

  @IsOptional()
  @IsString()
  serviceCategory: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  price: number;

  @IsOptional()
  @IsString()
  status: string;
}
