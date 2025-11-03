import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('providers')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  // PUT /providers/services/:id — full update (replace) of a service (UpdateServiceDto) — uses @Body & @Param
  // PATCH /providers/services/:id — partial update (PatchServiceDto) — uses @Body & @Param
  // DELETE /providers/services/:id — delete a service — uses @Param
  @Post('register') //POST /providers/register
  registerProvider(
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

  @Get('services') // GET /providers/services OR // GET /providers/services?serviceName=Healthcare
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

  @Get('service/:id') // GET /providers/services/:id
  findServicesById(@Param('id', ParseIntPipe) id: number) {
    return this.providerService.findServicesById(id);
  }

  @Get('provider/:id') // GET /providers/provider/:id
  findServicesByProviderId(@Param('id', ParseIntPipe) id: number) {
    return this.providerService.findServicesByProviderId(id);
  }

  @Patch('services/:id') // PATCH /providers/services/:id
  updateService(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateserviceDto: UpdateServiceDto,
  ) {
    return this.providerService.updateService(id, updateserviceDto);
  }
  @Delete('services/:id') // DELETE /providers/services/:id
  deleteService(@Param('id', ParseIntPipe) id: number) {
    return this.providerService.deleteService(id);
  }
}
