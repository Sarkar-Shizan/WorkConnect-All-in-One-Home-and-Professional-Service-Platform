import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { CustomerProfileEntity } from '../profile/profile.entity';
import { ServiceBookingEntity } from '../service-booking/service-booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity, CustomerProfileEntity,ServiceBookingEntity])],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
