// import { CreateServiceDto } from './create-service.dto';
// // import { CreateProviderDto } from './create-provider.dto';
// import { PartialType } from '@nestjs/mapped-types';

// //export class UpdateServiceDto extends PartialType(CreateServiceDto) {}
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateServiceDto {
  @IsString()
  @IsNotEmpty()
  serviceName: string;

  @IsString()
  @IsNotEmpty()
  providerName: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
