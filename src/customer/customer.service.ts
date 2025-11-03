import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
 
    registerCustomer(registerCustomer: object): object {
        return { message: 'Customer registered successfully', data: registerCustomer };
    }
    loginCustomer(loginCustomer: object): object {
        return { message: 'Customer logged in successfully', data: loginCustomer };
    }
    getCustomerProfile(customerId: number): object {
        return { message: `Profile data for customer ID: ${customerId}`};
    }   
    updateCustomerProfile(customerId: number, updateCustomer: object):  object {
        return { message: `Customer profile updated for ID: ${customerId}`, updatedData: updateCustomer };
    }
   getServiceDetails(services: object): object {
        return { message: 'Service details fetched successfully', data: services };
    }
    bookService(bookService: object): object {
        return { message: 'Service booked successfully', bookingDetails: bookService };
    }
    cancelServiceBooking(serviceId: number):object{
        return { message: `Service booking with ID: ${serviceId} has been cancelled` };
    }
    deleteCustomerAccount(customerId: number): object {
        return { message: `Customer account with ID: ${customerId} has been deleted` };
    }

}
