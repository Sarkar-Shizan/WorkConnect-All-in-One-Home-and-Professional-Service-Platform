import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerProfileEntity } from './profile.entity';
import { CustomerEntity } from '../customer/customer.entity';
import { UpdateProfileDto } from './dto/update-customer.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(CustomerProfileEntity)
    private profileRepo: Repository<CustomerProfileEntity>,
    @InjectRepository(CustomerEntity)
    private customerRepo: Repository<CustomerEntity>,
  ) {}

  // ==============================
  // 1. Get Profile by Customer ID
  // ==============================
  async getProfileByCustomer(customerId: number): Promise<CustomerProfileEntity> {
    const profile = await this.profileRepo.findOne({
      where: { customer: { id: customerId } },
      relations: ['customer'],
    });

    if (!profile) {
      throw new NotFoundException('Profile not found for this customer.');
    }

    return profile;
  }

  // ==============================
  // 2. Create Profile
  // ==============================
  async createProfile(
    customerId: number,
    dto: UpdateProfileDto,
  ): Promise<CustomerProfileEntity> {
    const customer = await this.customerRepo.findOne({ where: { id: customerId } });
    if (!customer) {
      throw new NotFoundException('Customer not found.');
    }

    // Prevent duplicate profile
    const existing = await this.profileRepo.findOne({
      where: { customer: { id: customerId } },
    });

    if (existing) {
      throw new BadRequestException('Profile already exists for this customer.');
    }

    const profile = this.profileRepo.create({
      ...dto,
      customer,
    });

    return await this.profileRepo.save(profile);
  }

  // ==============================
  // 3. Update Profile (PATCH)
  // ==============================
  async updateProfile(
    customerId: number,
    dto: UpdateProfileDto,
  ): Promise<CustomerProfileEntity> {
    const profile = await this.profileRepo.findOne({
      where: { customer: { id: customerId } },
      relations: ['customer'],
    });

    if (!profile) {
      throw new NotFoundException('Profile not found for this customer.');
    }

    const updated = this.profileRepo.merge(profile, dto);

    return await this.profileRepo.save(updated);
  }

  // ==============================
  // 4. Delete Profile (only profile, not customer)
  // ==============================
async deleteProfile(customerId: number): Promise<object> {
  const profile = await this.profileRepo.findOne({
    where: { customer: { id: customerId } },
    relations: ['customer'],
  });

  if (!profile) {
    throw new NotFoundException('Profile not found for this customer.');
  }

  // Only remove the profile; customer remains
  await this.profileRepo.remove(profile);

  return { message: `Profile for customer ID ${customerId} deleted successfully` };
}
}
