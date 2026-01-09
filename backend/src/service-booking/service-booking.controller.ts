import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ServiceBookingService } from './service-booking.service';
import { BookServiceByCustomerDto } from './dto/book-service.dto';
import { CreateServiceDto } from './dto/services.dto';

@Controller('services')
export class ServiceBookingController {
  constructor(
    private readonly serviceBookingService: ServiceBookingService
  ) {}

 @Get(':customerId')
async getCustomerServices(@Param('customerId', ParseIntPipe) customerId: number) {
  return this.serviceBookingService.getServicesByCustomer(customerId);
}

@Post('book-service/:customerId')
async bookService(
  @Param('customerId', ParseIntPipe) customerId: number,
  @Body(new ValidationPipe()) dto: BookServiceByCustomerDto
) {
  return this.serviceBookingService.bookServiceForCustomer(customerId, dto);
}

@Get('details/:serviceId')
async getServiceById(@Param('serviceId', ParseIntPipe) serviceId: number) {
  return this.serviceBookingService.getServiceById(serviceId);
}

@Patch('cancel-service/:customerId/:serviceId')
async cancelService(
  @Param('customerId', ParseIntPipe) customerId: number,
  @Param('serviceId', ParseIntPipe) serviceId: number
) {
  return this.serviceBookingService.cancelServiceBookingForCustomer(customerId, serviceId);
}

@Get('booking/:bookingId')
async getBookingById(@Param('bookingId', ParseIntPipe) bookingId: number) {
  return this.serviceBookingService.getBookingById(bookingId);
}


 // POST /services/create - create a new service
  @Post('create')
  createService(@Body(new ValidationPipe()) dto: CreateServiceDto) {
    return this.serviceBookingService.createService(dto);
  }

  // GET /services - get all services
  @Get()
  getAllServices() {
    return this.serviceBookingService.getAllServices();
  }

}
