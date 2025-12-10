import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MailerModule } from '@nestjs-modules/mailer';
import { ServiceProviderController } from './service-provider.controller';
import { ServiceProviderService } from './service-provider.service';
import { ServiceProviderEntity } from './service-provider.entity';
import { ServiceEntity } from './service.entity';
import { ProfileEntity } from './profile.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceProviderEntity,
      ServiceEntity,
      ProfileEntity,
    ]),
    PassportModule,
    JwtModule.register({
      secret: 'mySecretKey12345',
      signOptions: { expiresIn: '24h' },
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'mdnaimurerahamanemon@gmail.com',
          pass: 'pwow ieju fubo mndm',
        },
      },
      defaults: {
        from: '"WorkConnect" <noreply@workconnect.com>',
      },
    }),
  ],
  controllers: [ServiceProviderController],
  providers: [ServiceProviderService, JwtStrategy],
})
export class ServiceProviderModule {}
