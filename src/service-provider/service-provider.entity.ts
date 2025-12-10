import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ServiceEntity } from './service.entity';
import { ProfileEntity } from './profile.entity';

@Entity('service_providers')
export class ServiceProviderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'fullname', type: 'varchar', nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'bigint', unsigned: true, unique: true })
  phoneNumber: number;

  @Column()
  password: string;

  @Column({ nullable: true })
  specialization: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0.0 })
  rating: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @OneToMany(() => ServiceEntity, (service) => service.serviceProvider, {
    cascade: true,
  })
  services: ServiceEntity[];

  @OneToOne(() => ProfileEntity, (profile) => profile.serviceProvider, {
    cascade: true,
  })
  profile: ProfileEntity;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
