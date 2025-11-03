import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { CreateServiceDto } from './dto/create-service.dto';

@Controller('providers')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  // GET /providers/services — list all services, supports optional query filters (category, city, minPrice, maxPrice) — uses @Query
  // GET /providers/services/:id — get single service by service id — uses @Param
  // GET /providers/:providerId/services — list all services of a provider — uses @Param
  // PUT /providers/services/:id — full update (replace) of a service (UpdateServiceDto) — uses @Body & @Param
  // PATCH /providers/services/:id — partial update (PatchServiceDto) — uses @Body & @Param
  // DELETE /providers/services/:id — delete a service — uses @Param
  @Post('register') //POST /providers/register
  register(
    @Body(ValidationPipe)
    createProviderDto: CreateProviderDto,
  ) {
    return this.providerService.registerProvider(createProviderDto);
  }

  @Post('services') //POST /providers/services
  createService(
    @Body(ValidationPipe)
    createServiceDto: CreateServiceDto,
  ) {
    return this.providerService.createService(createServiceDto);
  }

  @Get('services')
  findAllServices(
    @Query('serviceName')
    serviceName?:
      | 'Healthcare'
      | 'Data Analysis'
      | 'IT Consulting'
      | 'Web Development',
  ) {
    return this.providerService.findAllServices(serviceName);
  }
}
