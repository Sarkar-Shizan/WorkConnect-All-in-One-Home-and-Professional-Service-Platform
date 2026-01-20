import { Injectable, NotFoundException ,BadRequestException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceBookingEntity } from './service-booking.entity';
import { BookServiceByCustomerDto } from './dto/book-service.dto';
import { CustomerEntity } from '../customer/customer.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { ServiceEntity } from './services.entity';
import { CreateServiceDto } from './dto/services.dto';
import { PusherService } from '../pusher/pusher.service';

@Injectable()
export class ServiceBookingService {
  constructor(
    @InjectRepository(ServiceBookingEntity)
    private readonly bookingRepository: Repository<ServiceBookingEntity>,
    
    @InjectRepository(ServiceEntity)
    private serviceRepo: Repository<ServiceEntity>,
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    private mailerService: MailerService,
    private pusherService: PusherService,

  ) {}

  // Get all bookings for a specific customer
  async getServicesByCustomer(customerId: number) {
  const bookings = await this.bookingRepository.find({
    where: { customer: { id: customerId } },
    relations: ['service', 'customer'], 
  });

  if (!bookings || bookings.length === 0) {
    throw new NotFoundException('No bookings found for this customer');
  }

  // Return full bookings with service entity included
  return bookings;
}


 async bookServiceForCustomer(customerId: number, dto: BookServiceByCustomerDto) {
  const customer = await this.customerRepository.findOne({ where: { id: customerId } });
  if (!customer) throw new NotFoundException('Customer not found');

  const service = await this.serviceRepo.findOne({ where: { id: dto.serviceId } });
  if (!service) throw new NotFoundException('Service not found');

  const booking = this.bookingRepository.create({
    service,
    serviceAddress: dto.serviceAddress,
    serviceDate: dto.serviceDate,
    customer,
  });

  await this.bookingRepository.save(booking);

  // Send booking email
  await this.mailerService.sendMail({
    to: customer.email,
    subject: 'Booking Successful!',
    html: `
      <h2>Hello, ${customer.name}!</h2>
      <p>Your booking for <strong>${service.serviceTitle}</strong> has been registered for <strong>${dto.serviceDate}</strong>.</p>
      <p>Service Provider: ${service.companyName}</p>
      <p>Thank you for choosing WorkConnect!</p>
    `,
  });

  await this.pusherService.trigger('bookings', 'booking-created', {
    message: `New booking by ${customer.name} for ${service.serviceTitle} is successfully created.`,
    bookingId: booking.id,
  });


  return booking;
}

//get service by id
  async getServiceById(serviceId: number) {
    const service = await this.serviceRepo.findOne({ where: { id: serviceId } });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }
//get booking by id
  async getBookingById(bookingId: number) {
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId },
      relations: ['service', 'customer'],
    });
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
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

     // Check if already cancelled
  if (booking.status === 'cancelled') {
    throw new BadRequestException('Booking is already cancelled');
  }

  // Proceed with cancellation
  booking.status = 'cancelled';
  await this.bookingRepository.save(booking);

    booking.status = 'cancelled';
    await this.bookingRepository.save(booking);

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

   await this.pusherService.trigger('bookings', 'booking-cancelled', {
    message: `Booking cancelled by ${booking.customer.name} for service ${serviceId}`,
    bookingId: booking.id,
  });

    return booking;
  }


  // -------------------
  // Provider endpoints
  // -------------------

  createService(dto: CreateServiceDto) {
    const service = this.serviceRepo.create(dto);
    return this.serviceRepo.save(service);
  }

  getAllServices() {
    return this.serviceRepo.find();
  }

}
