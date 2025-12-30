import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ServiceBookingService } from './service-booking.service';
import { BookServiceByCustomerDto } from './dto/book-service.dto';

@Controller('services')
export class ServiceBookingController {
  constructor(
    private readonly serviceBookingService: ServiceBookingService,
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

@Patch('cancel-service/:customerId/:serviceId')
async cancelService(
  @Param('customerId', ParseIntPipe) customerId: number,
  @Param('serviceId', ParseIntPipe) serviceId: number
) {
  return this.serviceBookingService.cancelServiceBookingForCustomer(customerId, serviceId);
}

}
