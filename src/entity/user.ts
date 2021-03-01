import { Group } from './group';
import { Check, Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class User {
    @PrimaryColumn()
    @Check("phone ~* '^\\+972-5\\d-\\d{3}-\\d{4}$'")
    phone: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    about: string;
    
    @ManyToMany(() => Group,group=>group.users)
    groups: Group[];
}