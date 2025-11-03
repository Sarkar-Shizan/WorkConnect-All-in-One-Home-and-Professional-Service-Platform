import { CreateServiceDto } from './create-service.dto';
// import { CreateProviderDto } from './create-provider.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}
