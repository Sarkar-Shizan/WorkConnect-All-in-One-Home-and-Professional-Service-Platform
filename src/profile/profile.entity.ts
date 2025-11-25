import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm';
import { CustomerEntity } from '../customer/customer.entity';

@Entity('customer_profiles')
export class CustomerProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: true })
  dob: string; 

  @Column({ type: 'enum', enum: ['Male', 'Female'], nullable: true })
  gender: 'Male' | 'Female';
  
  @Column({ nullable: true })
  address: string;

 @OneToOne(() => CustomerEntity, customer => customer.profile, {onDelete: 'CASCADE'} )
 @JoinColumn()
 customer: CustomerEntity; 

}
