import { Group } from './group';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content:string;
    
    @ManyToOne(()=>User)
    sender:User;
    
    @ManyToOne(()=>Group,group=>group.messages)
    group:Group;


    @CreateDateColumn({type:'timestamp with time zone'})
    sentTime: Date;

}