import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToOne ,OneToMany ,JoinColumn} from "typeorm";
import * as bcrypt from 'bcrypt';
import { CustomerProfileEntity } from "../profile/profile.entity";
import { ServiceBookingEntity } from "../service-booking/service-booking.entity";

 @Entity("customers")
 export class CustomerEntity{
 @PrimaryGeneratedColumn()
 id: number;

 @Column({ name: "fullname" , type: "varchar", nullable: true })
 name: string;

 @Column({ unique: true })
 email: string;

 @Column({type:"bigint" , unsigned:true })
 phoneNumber: number;

 @Column()
 password: string;

 @Column({ nullable: true })
 profileImage: string;
 
 @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
@OneToOne(() => CustomerProfileEntity, profile => profile.customer, {
  cascade: true       // propagate save/remove // database deletes profile when customer is deleted
})          // owning side
profile: CustomerProfileEntity;

@OneToMany(() => ServiceBookingEntity, booking => booking.customer, {
  cascade: true
  // deletes bookings when customer is deleted
})
bookings: ServiceBookingEntity[];

}
