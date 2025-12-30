import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CustomerEntity } from '../customer.entity';
import { LoginCustomerDto } from '../dto/login-customer.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepo: Repository<CustomerEntity>,
    private jwtService: JwtService,
    private mailerService: MailerService
  ) {}

  // Only login generates JWT
  async login(dto: LoginCustomerDto): Promise<{ access_token: string }> {
    const customer = await this.customerRepo.findOne({ where: { email: dto.email } });
    if (!customer) throw new UnauthorizedException('Customer not found');

    const isMatch = await bcrypt.compare(dto.password, customer.password);
    if (!isMatch) throw new UnauthorizedException('Invalid password');

    await this.mailerService.sendMail({
      to: customer.email,
      subject: 'Login Notification',
      html: `
        <h2>Hello, ${customer.name}</h2>
        <p>You have successfully logged in to your WorkConnect account.</p>
        <p>If this was not you, please secure your account immediately.</p>
      `,
    });

    const payload = { id: customer.id, email: customer.email };
    return { access_token: await this.jwtService.signAsync(payload) };
  }


  async validateToken(token: string) {
    try {
      return this.jwtService.verifyAsync(token);
    } catch {
      return null;
    }
  }
}
