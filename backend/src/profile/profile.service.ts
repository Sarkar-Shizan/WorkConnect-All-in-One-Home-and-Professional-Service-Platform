import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerProfileEntity } from './profile.entity';
import { CustomerEntity } from '../customer/customer.entity';
import { UpdateProfileDto } from './dto/update-customer.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(CustomerProfileEntity) private profileRepo: Repository<CustomerProfileEntity>,@InjectRepository(CustomerEntity)private customerRepo: Repository<CustomerEntity>, private readonly mailerService: MailerService) {}
 
  // Create Profile (POST) for customer
  async createProfile(customerId: number,dto: UpdateProfileDto,): Promise<CustomerProfileEntity> {
    const customer = await this.customerRepo.findOne({ where: { id: customerId } });
    if (!customer) throw new NotFoundException('Customer not found.');
    // Prevent duplicate profile
    const existing = await this.profileRepo.findOne({
      where: { customer: { id: customerId } },
    });

    if (existing) throw new BadRequestException('Profile already exists for this customer.');
 
    const profile = this.profileRepo.create({...dto,customer,});

    //profile link Email Notification
    await this.mailerService.sendMail({
    to: customer.email,
    subject: 'Profile Linking Successful!',
    html: `
      <h2>Hello, ${customer.name}!</h2>
      <p>Your profile details has been successfully linked to your WorkConnectCustomer account with Id:${customer.id}.</p>
      <p><strong>Email:</strong> ${customer.email}</p>
      <p>Thank you for staying with <strong>WorkConnect</strong>!</p>
    `,
  });

    return await this.profileRepo.save(profile);
  }
   // Get Profile by Customer ID
  async getProfileByCustomer(customerId: number): Promise<CustomerProfileEntity> {

    const profile = await this.profileRepo.findOne({
      select: { customer: { id: true, name: true, email: true, phoneNumber: true } },
      where: { customer: { id: customerId } },
      relations: ['customer']});

    if (!profile) throw new NotFoundException('Profile not found for this customer.');
    

    return profile;
  }

  // Update Profile (PATCH)
  async updateProfile(customerId: number,dto: UpdateProfileDto,): Promise<CustomerProfileEntity> {
    const profile = await this.profileRepo.findOne({
      where: { customer: { id: customerId } },
      relations: ['customer']});

    if (!profile) throw new NotFoundException('Profile not found for this customer.');
    
    const updated = this.profileRepo.merge(profile, dto);

    return await this.profileRepo.save(updated);
  }

//  Delete Profile (only profile, not customer)
async deleteProfile(customerId: number): Promise<object> {
  const profile = await this.profileRepo.findOne({
    where: { customer: { id: customerId } },
    relations: ['customer'],
  });

  if (!profile) throw new NotFoundException('Profile not found for this customer.');

  // Remove only the profile entity
  await this.profileRepo.remove(profile);
  

  return { message: `Profile for customer ID ${customerId} deleted successfully` };
}
}