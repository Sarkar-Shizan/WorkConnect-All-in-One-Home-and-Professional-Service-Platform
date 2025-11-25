import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-customer.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // ==============================
  // 1. Get profile of a customer
  // ==============================
  @Get('customer/:id')
  async getProfile(@Param('id', ParseIntPipe) customerId: number) {
    return await this.profileService.getProfileByCustomer(customerId);
  }

  // ==============================
  // 2. Create profile for a customer
  // ==============================
  @Post('customer/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createProfile(
    @Param('id', ParseIntPipe) customerId: number,
    @Body() dto: UpdateProfileDto,
  ) {
    return await this.profileService.createProfile(customerId, dto);
  }

  // ==============================
  // 3. Update profile (PATCH = partial update)
  // ==============================
  @Patch('customer/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateProfile(
    @Param('id', ParseIntPipe) customerId: number,
    @Body() dto: UpdateProfileDto,
  ) {
    return await this.profileService.updateProfile(customerId, dto);
  }

  // ==============================
  // 4. Delete profile for a customer
  // ==============================
  @Delete('customer/:id')
  async deleteProfile(@Param('id', ParseIntPipe) customerId: number) {
    return await this.profileService.deleteProfile(customerId);
  }
}
