import { Message } from './message';
import {  BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Group extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @ManyToMany(() => User,user=>user.groups)
    @JoinTable()
    users: User[]

    @OneToMany(() => Message,message=>message.group)
    messages: Message[]

    @Column({default:false})
    isChat:boolean
};