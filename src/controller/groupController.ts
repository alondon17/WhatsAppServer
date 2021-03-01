import { Group } from './../entity/group';
import { getRepository } from "typeorm";
import { User } from '../entity/user';
import { Request, Response } from 'express';

export class GroupController {
    private groupRepository = getRepository(Group)
    private userRepository = getRepository(User)
    async getGroupsByUser(request: Request, response: Response) {

        const user = (await this.userRepository.find()).find(per => per.phone === request.body.phone)

        const help3 = await this.userRepository.createQueryBuilder('user')
            .where('user.phone= :phone', { phone: request.body.phone })
            .leftJoinAndSelect("user.groups", "group")
            .leftJoinAndSelect('group.messages', 'groupmessages')
            .leftJoinAndSelect('groupmessages.sender', 'groupmessagessenders')
            .leftJoinAndSelect('group.users', 'groupusers')
            // .select("*")
            .getMany()

        // console.log("help1",help1);
        // console.log("help2",help2);
        return help3
    }
    async one(request: Request, response: Response) {
        return this.groupRepository.findOne(request.params.id);
    }
    async save(request: Request, response: Response) {
        const {name,users,isChat=false}=request.body
        const dbUsers:User[]=[]
        for(const user of users){
            const dbUser=await this.userRepository.findOne(user)
            console.log(dbUser);
            
            dbUser&&dbUsers.push(dbUser)
        }
        console.log('t');
        
        return this.groupRepository.save({name:name,users:dbUsers,isChat:isChat})
    }
}