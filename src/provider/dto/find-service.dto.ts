import {
  IsNumber,
  IsString,
  IsPositive,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FindServiceDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  serviceName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  providerName?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price?: number;
}
