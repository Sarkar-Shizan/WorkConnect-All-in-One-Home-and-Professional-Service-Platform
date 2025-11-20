import { Entity, PrimaryColumn, Column, BeforeInsert } from "typeorm";

 @Entity("customers")
 export class CustomerEntity{
 @PrimaryColumn()
 id: number;

 @Column({ name: "fullname" , type: "varchar", nullable: true })
 name: string;

 @Column()
 email: string;

 @Column({type:"bigint" , unsigned:true })
 phoneNumber: number;

 @Column()
 password: string;

 @Column({ default: true })
 isActive: boolean;

 @BeforeInsert()
 generateId() {
  this.id = Math.floor( Math.random() * 900000);
 }
  
}
