import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { ProfileModule } from './profile/profile.module';
import { ServiceBookingModule } from './service-booking/service-booking.module';


@Module({
  imports: [
    CustomerModule,
    ProfileModule,
    ServiceBookingModule,
    TypeOrmModule.forRoot({
     
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
