import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CustomerEntity } from '../customer/customer.entity';

@Entity('service_bookings')
export class ServiceBookingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serviceCategory: string;

  @Column()
  serviceAddress: string;

  @Column('date')
  serviceDate: string;

  @Column('time')
  serviceTime: string;

  @Column({ nullable: true })
  serviceDescription: string;

  @Column()
  servicePackage: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalCost: number;

  @Column()
  paymentMethod: string;

  @Column({ default: 'Pending' })
  status: string;

  @ManyToOne(() => CustomerEntity, customer => customer.bookings)
  customer: CustomerEntity;

}
