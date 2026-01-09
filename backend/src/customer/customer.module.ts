import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { CustomerProfileEntity } from '../profile/profile.entity';
import { ServiceBookingEntity } from '../service-booking/service-booking.entity';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PusherModule } from 'src/pusher/pusher.module';

@Module({
 imports: [TypeOrmModule.forFeature([CustomerEntity, CustomerProfileEntity,ServiceBookingEntity]),AuthModule,PusherModule, MailerModule.forRoot({
 transport: {
 host: 'smtp.gmail.com',
 port: 465,
 ignoreTLS: true,
 secure: true,
 auth: {
 user: 'shizansarkar@gmail.com',
 pass: 'jgsn vdbp ltzm nvoj'
 }
}
})
],

  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
