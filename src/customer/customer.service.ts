import { Injectable , BadRequestException } from '@nestjs/common';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerEntity } from './customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class CustomerService {
    constructor(@InjectRepository(CustomerEntity) private customerRepository: Repository<CustomerEntity>){}

    //----- register customer-------

    async registerCustomer(registerCustomer: CustomerEntity): Promise<CustomerEntity> {
    // Check if email or phone already exists
    const exists = await this.customerRepository.findOne({
      where: [
        { email: registerCustomer.email },
        { phoneNumber: registerCustomer.phoneNumber },
      ],
    });
    if (exists) {
      throw new BadRequestException('Email or phone number already exists.');
    }
  const newCustomer = this.customerRepository.create(registerCustomer);
  return await this.customerRepository.save(newCustomer); 
  }

   //-----update phone number------

   async updatePhoneNumber(customerId: number, newPhoneNumber: number): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOneBy({ id: customerId });
    if (!customer) throw new BadRequestException(`Customer not found`);
    if (customer.phoneNumber === newPhoneNumber) 
        throw new BadRequestException(`New phone number is the same as current`);
    
    const existing = await this.customerRepository.findOneBy({ phoneNumber: newPhoneNumber });
    if (existing) throw new BadRequestException(`Phone number already in use`);

    customer.phoneNumber = newPhoneNumber;
    return await this.customerRepository.save(customer);
}

  //----------get customer by null Name-------
  async getCustomerByNullName(): Promise<CustomerEntity[]> {
  return await this.customerRepository.find({
    where: [
      { name: IsNull() },
      { name: "" }
    ],
  });
}


    //-------- Delete customer account --------
async deleteCustomerAccount(customerId: number): Promise<object> {
  // Check if customer exists first
  const customer = await this.customerRepository.findOneBy({ id: customerId });
  if (!customer) throw new BadRequestException('Customer not found');

  await this.customerRepository.delete(customerId);
  return {message:`Customer account with id ${customerId} deleted successfully`};
}


    //login customer
    loginCustomer(loginCustomer: object): object {
        return { message: 'Customer logged in successfully', data: loginCustomer };
    }
    //get customer profile
    getCustomerProfile(customerId: number): object {
        return { message: `Profile data for customer ID: ${customerId}`};
    }  
    //update customer profile 
    updateCustomerProfile(customerId: number, updateCustomer: UpdateCustomerDto , idProof: Express.Multer.File ):  object {
        return { message: `Customer profile with ID: ${customerId} updated successfully`, updatedData: {...updateCustomer} , idProofFile: idProof?.filename};
    }
    //get service details
   getServiceDetails(services: object): object {
        return { message: 'Service details fetched successfully', data: services };
    }
    //book service
    bookService(bookService: object): object {
        return { message: 'Service booked successfully', bookingDetails: bookService };
    }
    //cancel service booking
    cancelServiceBooking(serviceId: number):object{
        return { message: `Service booking with ID: ${serviceId} has been cancelled` };
    }
    
}
