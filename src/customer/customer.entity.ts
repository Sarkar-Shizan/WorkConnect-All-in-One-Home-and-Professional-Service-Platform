import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcrypt';

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

 @Column({ default: true })
 isActive: boolean;

 @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
