import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { CustomerProfileEntity } from './profile.entity';
import { CustomerEntity } from '../customer/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerProfileEntity, CustomerEntity])],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
