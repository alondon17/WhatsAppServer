import { Message } from './message';
import { Check, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number;;;;;;;;

    @Column()
    name: string
    
    @ManyToMany(() => User,user=>user.groups)
    @JoinTable()
    users: User[]

    @OneToMany(() => Message,message=>message.group)
    messages: Message[];

    @Column({default:false})
    isChat:boolean;;;
};