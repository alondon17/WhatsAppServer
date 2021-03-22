import { Group } from './../entity/group';
import { getRepository } from "typeorm";
import { User } from '../entity/user';
import { Request, Response } from 'express';

export class GroupController {
    private groupRepository = getRepository(Group)
    private userRepository = getRepository(User)
    public async getGroupsByUser(request: Request, response: Response) {
        return await this.userRepository.createQueryBuilder('user')
            .where('user.phone= :phone', { phone: request.body.phone })
            .leftJoinAndSelect("user.groups", "group")
            .leftJoinAndSelect('group.messages', 'groupmessages')
            .leftJoinAndSelect('groupmessages.sender', 'groupmessagessenders')
            .leftJoinAndSelect('group.users', 'groupusers')
            .getMany() 
    }
    public async one(request: Request, response: Response) {
        return await this.groupRepository.findOne(request.params.id);
    }
    public async save(request: Request, response: Response) {
        const {name,users,isChat=false}=request.body
        const dbUsers:User[]=[]
        let dbUser
        for(const user of users){
            dbUser=await this.userRepository.findOne(user)
            console.log(dbUser);
            
            dbUser&&dbUsers.push(dbUser)
        }
        return await this.groupRepository.save({name:name,users:dbUsers,isChat:isChat})
    }
}