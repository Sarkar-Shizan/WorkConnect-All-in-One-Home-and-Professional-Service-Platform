import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';


@Entity('services')
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serviceTitle: string;

  @Column()
  serviceCategory: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ default: '' })
  companyName: string;
}
