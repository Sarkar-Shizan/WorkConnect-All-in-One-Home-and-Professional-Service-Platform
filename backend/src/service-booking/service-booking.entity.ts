import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CustomerEntity } from '../customer/customer.entity';
import { ServiceEntity } from './services.entity';

@Entity('service_bookings')
export class ServiceBookingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ServiceEntity, { eager: true }) // Automatically fetch service details
  @JoinColumn()
  service: ServiceEntity;

  @Column()
  serviceAddress: string;

  @Column('date')
  serviceDate: string;

  @Column({ default: 'Booked' })
  status: string;

  @ManyToOne(() => CustomerEntity, customer => customer.bookings, { onDelete: "CASCADE" })
  @JoinColumn()
  customer: CustomerEntity;
}
