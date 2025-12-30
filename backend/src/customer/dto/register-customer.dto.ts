import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class RegisterCustomerDto {
    @IsOptional()
    @IsString()
    @Matches(/^[A-Za-z\s.]+$/,{ message: 'Name must not contain any special character!' })
    name: string;

    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty()
    @Matches(/^01\d{9}$/, { message: 'Phone number must start with 01 and be exactly 11 digits long' })
    phoneNumber: number;

    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @Matches(/^.*[a-z].*$/, { message: 'Password must contain at least one lowercase letter' })
    password: string;
   
}