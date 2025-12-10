import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ServiceProviderService } from './service-provider.service';
import { RegisterServiceProviderDto } from './dto/register-service-provider.dto';
import { LoginServiceProviderDto } from './dto/login-service-provider.dto';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('service-provider')
export class ServiceProviderController {
  constructor(
    private readonly serviceProviderService: ServiceProviderService,
  ) {}

  // 1. Register
  @Post('register')
  @UsePipes(new ValidationPipe())
  registerServiceProvider(@Body() registerDto: RegisterServiceProviderDto) {
    return this.serviceProviderService.registerServiceProvider(registerDto);
  }

  // 2. Login
  @Post('login')
  @UsePipes(new ValidationPipe())
  loginServiceProvider(@Body() loginDto: LoginServiceProviderDto) {
    return this.serviceProviderService.loginServiceProvider(loginDto);
  }

  // 3. Get All Providers
  @Get('all')
  getAllServiceProviders() {
    return this.serviceProviderService.getAllServiceProviders();
  }

  // 4. Get Profile (Protected)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProviderProfile(@Query('providerId', ParseIntPipe) providerId: number) {
    return this.serviceProviderService.getProviderProfile(providerId);
  }

  // 5. Update Provider (Protected)
  @UseGuards(JwtAuthGuard)
  @Put('update/:providerId')
  @UsePipes(new ValidationPipe())
  updateServiceProvider(
    @Param('providerId', ParseIntPipe) providerId: number,
    @Body() updateDto: UpdateServiceProviderDto,
  ) {
    return this.serviceProviderService.updateServiceProvider(
      providerId,
      updateDto,
    );
  }

  // 6. Update Phone (Protected)
  @UseGuards(JwtAuthGuard)
  @Patch('update-phone/:email')
  updatePhoneNumber(
    @Param('email') email: string,
    @Body('phoneNumber') phoneNumber: number,
  ) {
    return this.serviceProviderService.updatePhoneNumber(email, phoneNumber);
  }

  // 7. Get Null Names
  @Get('null-name')
  getProvidersByNullName() {
    return this.serviceProviderService.getProvidersByNullName();
  }

  // 8. Delete Account (Protected)
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:providerId')
  deleteProviderAccount(@Param('providerId', ParseIntPipe) providerId: number) {
    return this.serviceProviderService.deleteProviderAccount(providerId);
  }

  // === SERVICE ROUTES ===

  // 9. Create Service (Protected)
  @UseGuards(JwtAuthGuard)
  @Post('service/:providerId')
  @UsePipes(new ValidationPipe())
  createService(
    @Param('providerId', ParseIntPipe) providerId: number,
    @Body() createServiceDto: CreateServiceDto,
  ) {
    return this.serviceProviderService.createService(
      providerId,
      createServiceDto,
    );
  }

  // 10. Get Services by Provider
  @Get('services/:providerId')
  getServicesByProvider(@Param('providerId', ParseIntPipe) providerId: number) {
    return this.serviceProviderService.getServicesByProvider(providerId);
  }

  // 11. Update Service (Protected)
  @UseGuards(JwtAuthGuard)
  @Put('service/:providerId/:serviceId')
  @UsePipes(new ValidationPipe())
  updateService(
    @Param('serviceId', ParseIntPipe) serviceId: number,
    @Param('providerId', ParseIntPipe) providerId: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.serviceProviderService.updateService(
      serviceId,
      providerId,
      updateServiceDto,
    );
  }

  // 12. Delete Service (Protected)
  @UseGuards(JwtAuthGuard)
  @Delete('service/:providerId/:serviceId')
  deleteService(
    @Param('serviceId', ParseIntPipe) serviceId: number,
    @Param('providerId', ParseIntPipe) providerId: number,
  ) {
    return this.serviceProviderService.deleteService(serviceId, providerId);
  }

  // === PROFILE ROUTES ===

  // 13. Create Profile (Protected)
  @UseGuards(JwtAuthGuard)
  @Post('profile/:providerId')
  @UsePipes(new ValidationPipe())
  createProfile(
    @Param('providerId', ParseIntPipe) providerId: number,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return this.serviceProviderService.createProfile(
      providerId,
      createProfileDto,
    );
  }

  // 14. Get Profile by ID
  @Get('profile/:providerId')
  getProfile(@Param('providerId', ParseIntPipe) providerId: number) {
    return this.serviceProviderService.getProfile(providerId);
  }

  // 15. Update Profile (Protected)
  @UseGuards(JwtAuthGuard)
  @Patch('profile/:providerId')
  @UsePipes(new ValidationPipe())
  updateProfile(
    @Param('providerId', ParseIntPipe) providerId: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.serviceProviderService.updateProfile(
      providerId,
      updateProfileDto,
    );
  }
}
