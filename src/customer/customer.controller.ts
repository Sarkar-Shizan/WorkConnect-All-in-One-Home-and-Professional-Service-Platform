import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { BookServiceByCustomerDto } from './dto/book-service.dto';
import { ServiceDetailsDto } from './dto/services.dto';

@Controller('customer')
export class CustomerController {
 constructor(private readonly customerService :CustomerService) {}

 @Post('register')
 registerCustomer(@Body() registerCustomer: RegisterCustomerDto): object{
   console.log(registerCustomer);
   return this.customerService.registerCustomer(registerCustomer);
 }

 @Post('login')
 loginCustomer(@Body() loginCustomer: LoginCustomerDto ): object {
    console.log(loginCustomer.email);
   return this.customerService.loginCustomer(loginCustomer);
 }
 @Get('profile/:customerId')
 getCustomerProfile(@Param('customerId') customerId: number) {
   return this.customerService.getCustomerProfile(customerId);
 }

 @Put('update-profile/:customerId')
    updateCustomerProfile(@Param('customerId') customerId: number, @Body() updateCustomer: UpdateCustomerDto): object {
        console.log(updateCustomer);
        return this.customerService.updateCustomerProfile(customerId, updateCustomer);
    }

 @Get('services')
    getServiceDetails(@Query() services: ServiceDetailsDto): object {
    console.log(services.serviceCategory);
    return this.customerService.getServiceDetails(services);
   }

 @Post('book-service')
    bookService(@Body() bookService: BookServiceByCustomerDto) {
        console.log(bookService.serviceCategory);
        return this.customerService.bookService(bookService);
    }
 @Patch('cancel-service/:serviceId')
    cancelServiceBooking(@Param('serviceId') serviceId: number) {
        return this.customerService.cancelServiceBooking(serviceId);
    }

 @Delete('delete-account/:customerId')
    deleteCustomerAccount(@Param('customerId') customerId: number) {
        return this.customerService.deleteCustomerAccount(customerId);
    }   
 
 
}


