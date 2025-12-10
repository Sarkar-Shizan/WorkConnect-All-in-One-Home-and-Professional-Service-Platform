import { IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  yearsOfExperience: number;

  @IsOptional()
  @IsString()
  certificationUrl: string;
}
