import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UsePipes, ValidationPipe , UseInterceptors,UploadedFile, ParseIntPipe, Res} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { BookServiceByCustomerDto } from './dto/book-service.dto';
import { ServiceDetailsDto } from './dto/services.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { CustomerEntity } from './customer.entity';


@Controller('customer')
export class CustomerController {
 constructor(private readonly customerService :CustomerService) {}

 @Post('register')
 registerCustomer(@Body() registerCustomer: CustomerEntity): Promise<CustomerEntity>{
   return this.customerService.registerCustomer(registerCustomer);
 }

 @Patch('update-phone/:customerId')
  updatePhoneNumber(@Param('customerId',ParseIntPipe) customerId: number, @Body('phoneNumber') phoneNumber: number): Promise<CustomerEntity> {
  return this.customerService.updatePhoneNumber(customerId, phoneNumber);
  }

  @Get('null-name')
  getCustomerByNullName() {
  return this.customerService.getCustomerByNullName();
}

 @Delete('delete-account/:customerId')
    deleteCustomerAccount(@Param('customerId',ParseIntPipe) customerId: number) {
        return this.customerService.deleteCustomerAccount(customerId);
    }   
 
    
 @Post('login')
 loginCustomer(@Body() loginCustomer: LoginCustomerDto ): object {
   console.log(loginCustomer.phoneNumber);
   return this.customerService.loginCustomer(loginCustomer);
 }
 @Get('profile/:customerId')
 getCustomerProfile(@Param('customerId',ParseIntPipe) customerId: number) {
   return this.customerService.getCustomerProfile(customerId);
 }

 @Put('update-profile/:customerId')
 @UseInterceptors(FileInterceptor('idProof', {
    fileFilter: (req, file, cb) => {
      if (file.originalname.match(/^.*\.(pdf)$/))
        cb(null, true);
      else {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'pdf'), false);
      }
    },
    limits: { fileSize: 5*1024*1024}, //5 MB
    storage: diskStorage({
      destination: './uploads',
      filename: function (req, file, cb) {
        cb(null,file.originalname);
      },
    })
 }))
 @UsePipes(new ValidationPipe())
    updateCustomerProfile(@Param('customerId', ParseIntPipe) customerId: number, @Body() updateCustomer: UpdateCustomerDto , @UploadedFile() idProof:Express.Multer.File): object {
        console.log('Updated Data:',updateCustomer);
        console.log('Uploaded File:', idProof);
        return this.customerService.updateCustomerProfile(customerId, updateCustomer, idProof);
    }
    
  @Get('uploads/:filename')  
  serveFile(@Param('filename') filename: string, @Res() res): void {
    res.sendFile(filename, { root: './uploads' });
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
    cancelServiceBooking(@Param('serviceId',ParseIntPipe) serviceId: number) {
        return this.customerService.cancelServiceBooking(serviceId);
    }

 
}


