import { IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsDateString({}, { message: 'Invalid date format, expected YYYY-MM-DD' })
  dob: string;

  @IsOptional()
  @IsEnum(['Male', 'Female'], { message: 'Gender must be Male or Female' })
  gender: 'Male' | 'Female';

  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  address: string;
}

