import { Injectable, BadRequestException, NotFoundException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import * as bcrypt from 'bcrypt';
import { ServiceBookingEntity } from '../service-booking/service-booking.entity';
import { CustomerProfileEntity } from '../profile/profile.entity';

@Injectable()
export class CustomerService {
  constructor(@InjectRepository(CustomerEntity) private customerRepository: Repository<CustomerEntity>, @InjectRepository(ServiceBookingEntity)
    private bookingRepository: Repository<ServiceBookingEntity>,@InjectRepository(CustomerProfileEntity) private profileRepo: Repository<CustomerProfileEntity>) {}

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
 async replaceCustomer(id: number, registerCustomer: RegisterCustomerDto): Promise<CustomerEntity> {
  const customer = await this.customerRepository.findOneBy({ id });
  if (!customer) throw new NotFoundException(`Customer with ID ${id} not found`);
  const exists = await this.customerRepository.findOne({
    where: [
      { email: registerCustomer.email },
      { phoneNumber: registerCustomer.phoneNumber },
    ],
  });
  if (exists) {
     throw new HttpException('Email or phone number already exists.', 400);
    }
  const replacedCustomer = this.customerRepository.merge(customer, registerCustomer);
  if (registerCustomer.password) {
    replacedCustomer.password = await bcrypt.hash(registerCustomer.password, 10);// Hash new password if provided
  }
  return await this.customerRepository.save(replacedCustomer);
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
  
  // Check uniqueness only if email or phoneNumber are provided in the update
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