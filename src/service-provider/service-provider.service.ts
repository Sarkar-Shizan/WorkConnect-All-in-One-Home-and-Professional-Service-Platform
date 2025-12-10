import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { ServiceProviderEntity } from './service-provider.entity';
import { ServiceEntity } from './service.entity';
import { ProfileEntity } from './profile.entity';
import { RegisterServiceProviderDto } from './dto/register-service-provider.dto';
import { LoginServiceProviderDto } from './dto/login-service-provider.dto';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ServiceProviderService {
  constructor(
    @InjectRepository(ServiceProviderEntity)
    private providerRepository: Repository<ServiceProviderEntity>,
    @InjectRepository(ServiceEntity)
    private serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  // 1. Register Service Provider
  async registerServiceProvider(
    registerDto: RegisterServiceProviderDto,
  ): Promise<object> {
    const exists = await this.providerRepository.findOne({
      where: [
        { email: registerDto.email },
        { phoneNumber: registerDto.phoneNumber },
      ],
    });

    if (exists) {
      throw new HttpException(
        'Email or phone number already exists',
        HttpStatus.CONFLICT,
      );
    }

    const newProvider = this.providerRepository.create(registerDto);
    const savedProvider = await this.providerRepository.save(newProvider);

    // Send welcome email
    try {
      await this.mailerService.sendMail({
        to: savedProvider.email,
        subject: 'Welcome to WorkConnect!',
        html: `<h1>Welcome ${savedProvider.name || 'Service Provider'}!</h1>
                       <p>Your account has been created successfully.</p>`,
      });
    } catch (error) {
      console.log('Email sending failed:', error);
    }

    return {
      message: 'Service Provider registered successfully',
      provider: {
        id: savedProvider.id,
        name: savedProvider.name,
        email: savedProvider.email,
      },
    };
  }

  // 2. Login Service Provider
  async loginServiceProvider(
    loginDto: LoginServiceProviderDto,
  ): Promise<object> {
    const provider = await this.providerRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!provider) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      provider.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!provider.isActive) {
      throw new HttpException('Account is deactivated', HttpStatus.FORBIDDEN);
    }

    const payload = {
      sub: provider.id,
      email: provider.email,
      role: 'service-provider',
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      access_token: token,
      provider: {
        id: provider.id,
        name: provider.name,
        email: provider.email,
      },
    };
  }

  // 3. Get All Service Providers
  async getAllServiceProviders(): Promise<ServiceProviderEntity[]> {
    return await this.providerRepository.find({
      select: [
        'id',
        'name',
        'email',
        'phoneNumber',
        'specialization',
        'rating',
        'isActive',
      ],
    });
  }

  // 4. Get Provider Profile
  async getProviderProfile(providerId: number): Promise<object> {
    const provider = await this.providerRepository.findOne({
      where: { id: providerId },
      relations: ['profile', 'services'],
    });

    if (!provider) {
      throw new NotFoundException('Service Provider not found');
    }

    return {
      id: provider.id,
      name: provider.name,
      email: provider.email,
      specialization: provider.specialization,
      profile: provider.profile,
      services: provider.services,
    };
  }

  // 5. Update Service Provider
  async updateServiceProvider(
    providerId: number,
    updateDto: UpdateServiceProviderDto,
    certFile?: Express.Multer.File,
  ): Promise<object> {
    const provider = await this.providerRepository.findOneBy({
      id: providerId,
    });

    if (!provider) {
      throw new NotFoundException('Service Provider not found');
    }

    if (updateDto.email && updateDto.email !== provider.email) {
      const emailExists = await this.providerRepository.findOneBy({
        email: updateDto.email,
      });
      if (emailExists) {
        throw new HttpException('Email already in use', HttpStatus.CONFLICT);
      }
    }

    Object.assign(provider, updateDto);

    if (updateDto.password) {
      provider.password = await bcrypt.hash(updateDto.password, 10);
    }

    await this.providerRepository.save(provider);

    return {
      message: 'Service Provider updated successfully',
      updatedData: {
        name: provider.name,
        email: provider.email,
      },
    };
  }

  // 6. Update Phone Number
  async updatePhoneNumber(
    email: string,
    newPhoneNumber: number,
  ): Promise<ServiceProviderEntity> {
    const provider = await this.providerRepository.findOneBy({ email });

    if (!provider) {
      throw new NotFoundException('Service Provider not found');
    }

    if (provider.phoneNumber === newPhoneNumber) {
      throw new BadRequestException('New phone number is the same as current');
    }

    const existing = await this.providerRepository.findOneBy({
      phoneNumber: newPhoneNumber,
    });
    if (existing) {
      throw new HttpException(
        'Phone number already in use',
        HttpStatus.CONFLICT,
      );
    }

    provider.phoneNumber = newPhoneNumber;
    return await this.providerRepository.save(provider);
  }

  // 7. Get Providers with Null Name
  async getProvidersByNullName(): Promise<ServiceProviderEntity[]> {
    return await this.providerRepository.find({
      where: [{ name: IsNull() }, { name: '' }],
    });
  }

  // 8. Delete Provider Account
  async deleteProviderAccount(providerId: number): Promise<object> {
    const provider = await this.providerRepository.findOneBy({
      id: providerId,
    });

    if (!provider) {
      throw new NotFoundException('Service Provider not found');
    }

    await this.providerRepository.delete(providerId);

    return {
      message: `Service Provider account deleted successfully`,
    };
  }

  // === SERVICE OPERATIONS ===

  // 9. Create Service
  async createService(
    providerId: number,
    createServiceDto: CreateServiceDto,
  ): Promise<object> {
    const provider = await this.providerRepository.findOneBy({
      id: providerId,
    });

    if (!provider) {
      throw new NotFoundException('Service Provider not found');
    }

    const newService = this.serviceRepository.create({
      ...createServiceDto,
      providerId: providerId,
    });

    const savedService = await this.serviceRepository.save(newService);

    return {
      message: 'Service created successfully',
      service: savedService,
    };
  }

  // 10. Get Services by Provider
  async getServicesByProvider(providerId: number): Promise<ServiceEntity[]> {
    return await this.serviceRepository.find({
      where: { providerId: providerId },
    });
  }

  // 11. Update Service
  async updateService(
    serviceId: number,
    providerId: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<object> {
    const service = await this.serviceRepository.findOne({
      where: { id: serviceId, providerId: providerId },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    Object.assign(service, updateServiceDto);
    await this.serviceRepository.save(service);

    return {
      message: 'Service updated successfully',
      service: service,
    };
  }

  // 12. Delete Service
  async deleteService(serviceId: number, providerId: number): Promise<object> {
    const service = await this.serviceRepository.findOne({
      where: { id: serviceId, providerId: providerId },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    await this.serviceRepository.delete(serviceId);

    return {
      message: 'Service deleted successfully',
    };
  }

  // === PROFILE OPERATIONS ===

  // 13. Create Profile
  async createProfile(
    providerId: number,
    createProfileDto: CreateProfileDto,
  ): Promise<object> {
    const provider = await this.providerRepository.findOne({
      where: { id: providerId },
      relations: ['profile'],
    });

    if (!provider) {
      throw new NotFoundException('Service Provider not found');
    }

    if (provider.profile) {
      throw new BadRequestException('Profile already exists');
    }

    const newProfile = this.profileRepository.create({
      ...createProfileDto,
      providerId: providerId,
    });

    const savedProfile = await this.profileRepository.save(newProfile);

    return {
      message: 'Profile created successfully',
      profile: savedProfile,
    };
  }

  // 14. Get Profile
  async getProfile(providerId: number): Promise<ProfileEntity> {
    const profile = await this.profileRepository.findOne({
      where: { providerId: providerId },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  // 15. Update Profile
  async updateProfile(
    providerId: number,
    updateProfileDto: UpdateProfileDto,
    profilePicture?: Express.Multer.File,
  ): Promise<object> {
    const profile = await this.profileRepository.findOne({
      where: { providerId: providerId },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    Object.assign(profile, updateProfileDto);

    if (profilePicture) {
      profile.profilePicture = profilePicture.filename;
    }

    await this.profileRepository.save(profile);

    return {
      message: 'Profile updated successfully',
      profile: profile,
    };
  }
}
