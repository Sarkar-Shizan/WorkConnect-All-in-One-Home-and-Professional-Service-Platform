import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CustomerEntity } from '../customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEntity]),
    JwtModule.register({
      secret: '7ab2df3f41f01ee3c6557632d4e4298e60a9cb6a135b1b59b7a477507bf1696a',
      signOptions: { expiresIn: '45m' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
