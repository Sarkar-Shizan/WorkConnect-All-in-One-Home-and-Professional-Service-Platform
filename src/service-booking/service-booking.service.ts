import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceBookingEntity } from './service-booking.entity';
import { BookServiceByCustomerDto } from './dto/book-service.dto';
import { CustomerEntity } from '../customer/customer.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ServiceBookingService {
  constructor(
    @InjectRepository(ServiceBookingEntity)
    private readonly bookingRepository: Repository<ServiceBookingEntity>,

    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    private mailerService: MailerService
  ) {}

  // Get all bookings for a specific customer
  async getServicesByCustomer(customerId: number) {
    const customer = await this.customerRepository.findOne({
      where: { id: customerId },
      relations: ['bookings'],
    });

    if (!customer) throw new NotFoundException('Customer not available');

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

    //Booking Success Email Notification
    await this.mailerService.sendMail({
    to: customer.email,
    subject: 'Booking Successful!',
    html: `
      <h2>Hello, ${customer.name}!</h2>
      <p>Your booking request for ${dto.serviceCategory} has been successfully registered for the date ${dto.serviceDate}</p>
      <p>We will notify you once your service provider is assigned.</p>
      <p>Thank you for selecting <strong>WorkConnect</strong>!</p>
    `,
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

     //Booking Cancel Email Notification
    await this.mailerService.sendMail({
    to: booking.customer.email,
    subject: 'Cancel Successful!',
    html: `
      <h2>Hello, ${booking.customer.name}!</h2>
      <p>Your cancel request for service Id:${serviceId} has been successfull.</p>
      <p>Contact support if you have any questions.</p>
      <p>Thank you for staying with <strong>WorkConnect</strong>!</p>
    `,
  });

    return await this.bookingRepository.save(booking);
  }
}
