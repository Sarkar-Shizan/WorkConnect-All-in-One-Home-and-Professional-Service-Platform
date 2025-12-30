import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceBookingEntity } from './service-booking.entity';
import { ServiceBookingService } from './service-booking.service';
import { ServiceBookingController } from './service-booking.controller';
import { CustomerEntity } from '../customer/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceBookingEntity,CustomerEntity])],
  controllers: [ServiceBookingController],
  providers: [ServiceBookingService]

})
export class ServiceBookingModule {}
