import { Group } from './group';
import { BaseEntity, Check, Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
@Entity()
export class User extends BaseEntity {
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