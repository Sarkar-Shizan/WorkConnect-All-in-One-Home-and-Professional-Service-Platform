import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ServiceProviderEntity } from './service-provider.entity';

@Entity('provider_profiles')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ type: 'int', default: 0 })
  yearsOfExperience: number;

  @Column({ nullable: true })
  certificationUrl: string;

  @Column({ nullable: true })
  profilePicture: string;

  @OneToOne(() => ServiceProviderEntity, (provider) => provider.profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'providerId' })
  serviceProvider: ServiceProviderEntity;

  @Column()
  providerId: number;
}
