import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceBookingEntity } from './service-booking.entity';
import { BookServiceByCustomerDto } from './dto/book-service.dto';
import { CustomerEntity } from '../customer/customer.entity';

@Injectable()
export class ServiceBookingService {
  constructor(
    @InjectRepository(ServiceBookingEntity)
    private readonly bookingRepository: Repository<ServiceBookingEntity>,

    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  // Get all bookings for a specific customer
  async getServicesByCustomer(customerId: number) {
    const customer = await this.customerRepository.findOne({
      where: { id: customerId },
      relations: ['bookings'],
    });

    if (!customer) throw new NotFoundException('Customer not found');

    return customer.bookings;
  }

  // Book a service for a specific customer
  async bookServiceForCustomer(customerId: number, dto: BookServiceByCustomerDto) {
    const customer = await this.customerRepository.findOne({
      where: { id: customerId },
    });

    if (!customer) throw new NotFoundException('Customer not found');

    const booking = this.bookingRepository.create({
      ...dto,
      customer,
    });

    return await this.bookingRepository.save(booking);
  }

  // Cancel a booking for a specific customer
  async cancelServiceBookingForCustomer(customerId: number, serviceId: number) {
    const booking = await this.bookingRepository.findOne({
      where: { id: serviceId },
      relations: ['customer'],
    });

    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.customer.id !== customerId)
      throw new NotFoundException(`Booking does not belong to customer ${customerId}`);

    booking.status = 'cancelled';

    return await this.bookingRepository.save(booking);
  }
}
