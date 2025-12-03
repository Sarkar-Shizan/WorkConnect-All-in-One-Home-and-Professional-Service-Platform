import {Controller, Get,Post,Patch,Delete,Param,Body,UsePipes,ValidationPipe,ParseIntPipe,} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-customer.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
 

  // Create profile
  @Post('customer/:id')
  @UsePipes(new ValidationPipe())
  async createProfile(@Param('id', ParseIntPipe) customerId: number,@Body() dto: UpdateProfileDto,
  ) {
    return await this.profileService.createProfile(customerId, dto);
  }
   // Get profile 
  @Get('customer/:id')
  async getProfile(@Param('id', ParseIntPipe) customerId: number) {
    return await this.profileService.getProfileByCustomer(customerId);
  }

  // Update profile
  @Patch('customer/:id')
  @UsePipes(new ValidationPipe())
  async updateProfile( @Param('id', ParseIntPipe) customerId: number, @Body() dto: UpdateProfileDto,) {
    return await this.profileService.updateProfile(customerId, dto);
  }

  // Delete profile 
  @Delete('customer/:id')
  async deleteProfile(@Param('id', ParseIntPipe) customerId: number) {
    return await this.profileService.deleteProfile(customerId);
  }
}
