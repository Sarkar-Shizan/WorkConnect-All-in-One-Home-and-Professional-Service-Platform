import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,JoinColumn } from 'typeorm';
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

  @Column({ default: 'Booked' })
  status: string;

  @ManyToOne(() => CustomerEntity, customer => customer.bookings,{ onDelete: "CASCADE" })
  @JoinColumn()
  customer: CustomerEntity;

}
