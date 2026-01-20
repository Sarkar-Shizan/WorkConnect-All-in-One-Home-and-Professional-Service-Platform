import {Body, Controller, Delete, Get, Param, Patch, Post, Put, UsePipes, UseInterceptors, UploadedFile, ParseIntPipe, Res,Req, ValidationPipe,UseGuards, UnauthorizedException} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from './auth/auth.guard';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { IsOwnerGuard } from 'src/custom/is-owner.guard';
import { Owner } from 'src/custom/owner.decorator';


@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService
  ) {}

  // 1) POST /customer/register  (ValidationPipe applied via global or per-route)
  @Post('register')
  @UsePipes(new ValidationPipe())
  async registerCustomer(@Body() dto: RegisterCustomerDto) {
    return await this.customerService.registerCustomer(dto);
  }


  // 3) GET /customer/all
  @Get('all')
  async getAllCustomers() {
    return await this.customerService.getAllCustomers();
  }

  // 4) GET /customer/profile
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getMyProfile(@Req() req) {
  return await this.customerService.getCustomerById(req.user.id);
}



  // 5) PUT /customer/:id  (full replace)
  @UseGuards(JwtAuthGuard,IsOwnerGuard)
  @Owner('id')
  @Put('replace-profile/:id')
  async replaceCustomer(@Param('id', ParseIntPipe) id: number, @Body() dto: RegisterCustomerDto) {
  
    return await this.customerService.replaceCustomer(id, dto);
  }

  // 6) PATCH /customer/:id   (partial update)
  @UseGuards(JwtAuthGuard, IsOwnerGuard)
  @Owner('id')
  @Patch('update-profile/:id')
  @UseInterceptors(FileInterceptor('profileImage', {
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/^.*\.(jpg|jpeg|png)$/)) cb(null, true);
    else cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'Only JPG, JPEG, PNG allowed!'), false);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + '-' + file.originalname;
      cb(null, uniqueName);
    },
  }),
}))
async updateCustomer( @Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe({transform:true})) dto: UpdateCustomerDto, @UploadedFile() profileImage: Express.Multer.File,) {
  return await this.customerService.updateCustomer(id, dto, profileImage);
}

  // 7) DELETE /customer/:id
   @UseGuards(JwtAuthGuard, IsOwnerGuard)
   @Owner('id')
   @Delete('delete-account/:id')
   async deleteCustomer(@Param('id', ParseIntPipe) id: number) {
    return await this.customerService.deleteCustomer(id);
  }
  
 // 8) Serve uploaded profile images
  @Get('uploads/:filename')
  serveFile(@Param('filename') filename: string, @Res() res) {
    res.sendFile(filename, { root: './uploads' });
  }


}
