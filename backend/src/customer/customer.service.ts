import { Injectable, BadRequestException, NotFoundException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import * as bcrypt from 'bcrypt';
import { ServiceBookingEntity } from '../service-booking/service-booking.entity';
import { CustomerProfileEntity } from '../profile/profile.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { PusherService } from '../pusher/pusher.service';

@Injectable()
export class CustomerService {
  constructor(@InjectRepository(CustomerEntity) private customerRepository: Repository<CustomerEntity>, @InjectRepository(ServiceBookingEntity)
    private bookingRepository: Repository<ServiceBookingEntity>,@InjectRepository(CustomerProfileEntity) private profileRepo: Repository<CustomerProfileEntity>,private mailerService: MailerService, private pusherService: PusherService) {}

   //-----Register customer-------
    async registerCustomer(registerCustomer: RegisterCustomerDto): Promise<CustomerEntity> {
    // Check if email or phone already exists
    const exists = await this.customerRepository.findOne({
      where: [
        { email: registerCustomer.email },
        { phoneNumber: registerCustomer.phoneNumber },
      ],
    });
    if (exists) {
      throw new HttpException('Email or phone number already exists.', 400);
    }
  const newCustomer = this.customerRepository.create(registerCustomer);
  const savedCustomer = await this.customerRepository.save(newCustomer);

  // Send welcome email
   await this.mailerService.sendMail({
    to: savedCustomer.email,
    subject: 'Registration Successful!',
    html: `
      <h2>Welcome, ${savedCustomer.name}!</h2>
      <p>Your account has been successfully registered.</p>
      <p><strong>Email:</strong> ${savedCustomer.email}</p>
      <p>Thank you for joining <strong>WorkConnect</strong>!</p>
    `,
  });

  return savedCustomer; 
  }

  //----- Get all customers -------
  async getAllCustomers(): Promise<CustomerEntity[]> {
    return await this.customerRepository.find();
  }

  //----- Get customer by ID -------
  async getCustomerById(id: number): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }


  //----- Replace customer -------
async replaceCustomer(
  id: number,
  dto: RegisterCustomerDto
): Promise<CustomerEntity> {
  const customer = await this.customerRepository.findOneBy({ id });
  if (!customer) throw new NotFoundException(`Customer ${id} not found`);

  // Check email separately
  if (dto.email && dto.email !== customer.email) {
    const emailExists = await this.customerRepository.findOne({ where: { email: dto.email } });
    if (emailExists && emailExists.id !== id) {
      throw new HttpException("Email already exists", 400);
    }
  }

  // Check phone separately
  if (dto.phoneNumber && dto.phoneNumber !== customer.phoneNumber) {
    const phoneExists = await this.customerRepository.findOne({ where: { phoneNumber: dto.phoneNumber } });
    if (phoneExists && phoneExists.id !== id) {
      throw new HttpException("Phone number already exists", 400);
    }
  }

  // Merge updates
  const updated = this.customerRepository.merge(customer, dto);

  // Hash password if provided
  if (dto.password) {
    updated.password = await bcrypt.hash(dto.password, 10);
  }

  await this.customerRepository.save(updated);

  // Notify via Pusher
  await this.pusherService.trigger("customers", "profile-updated", {
    message: `${customer.name} Your Profile updated successfully`,
    customerId: updated.id,
  });

  return updated;
}



  //----- Update customer -------
  async updateCustomer(id: number,updateCustomer: UpdateCustomerDto, profileImage: Express.Multer.File): Promise<CustomerEntity> {
  const customer = await this.customerRepository.findOne({
    where: { id },
    relations: ['profile'], 
  });
  if (!customer) throw new NotFoundException(`Customer with ID ${id} not found`);

  const updatedCustomer = this.customerRepository.merge(customer, updateCustomer);

  if (updateCustomer && updateCustomer.password) {
    updatedCustomer.password = await bcrypt.hash(updateCustomer.password, 10);
  }
  
  // Check uniqueness only if email or phoneNumber 
  if (updateCustomer.email || updateCustomer.phoneNumber) {
    const exists = await this.customerRepository.findOne({
      where: [
        { email: updateCustomer.email },
        { phoneNumber: updateCustomer.phoneNumber },
      ],
    });

    if (exists) {
      throw new HttpException('Email or phone number already exists.', 400);
    }
  }

  // Handle profile image update (always allowed)
  if (profileImage) {
    if (customer.profileImage) {
      const fs = require('fs');
      const oldPath = `./uploads/${customer.profileImage}`;
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    updatedCustomer.profileImage = profileImage.filename;
  }

  return await this.customerRepository.save(updatedCustomer);
}

async deleteCustomer(id: number): Promise<{ message: string }> {
  const customer = await this.customerRepository.findOne({
    where: { id },
    relations: ['profile', 'bookings'],
  });

  if (!customer) throw new NotFoundException('Customer not found');

  if (customer.bookings && customer.bookings.some((booking) => booking.status === 'Booked')) {
    throw new BadRequestException('Cannot delete customer with active bookings');
  }

  await this.customerRepository.remove(customer);
  

  return { message: `Customer with ID ${id} deleted successfully` };
}

}