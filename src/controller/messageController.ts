import { Message } from './../entity/message';
import { Group } from './../entity/group';
import { getRepository } from "typeorm";
import { User } from '../entity/user';
import { Request,Response } from 'express';

export class MessageController{
    private groupRepository=getRepository(Group)
    private messageRepository=getRepository(Message)
    private userRepository=getRepository(User)
    
    public async getGroupsByUser(request:Request,response:Response){
        return await this.userRepository.createQueryBuilder('user')
        .where('user.phone= :phone',{phone:request.body.phone})
        .leftJoinAndSelect("user.groups","group")
        .leftJoinAndSelect('group.messages','groupmessages')
        .leftJoinAndSelect('groupmessages.sender','groupmessagessenders')
        .leftJoinAndSelect('group.users','groupusers')
        .getMany()
    }
    public async save(request:Request,response:Response){
        const {phone,content,groupId}=request.body
        const addedMessage=new Message()
        const group=(await this.groupRepository.findOne(groupId))
        const sender=(await this.userRepository.findOne(phone))
        if(!sender||!group)
        {
            return 'Sender or Group Not found'
        }
        addedMessage.sender=sender
        addedMessage.group=group
        addedMessage.content=content
        
        return await this.messageRepository.save(addedMessage)
    }
    public async search(request:Request,response:Response){
        const {query,phone}:{query:string,phone:string}=request.body
        console.log(query,phone);
        
        return await this.messageRepository.createQueryBuilder('message')
        .leftJoinAndSelect('message.group','group')
        .leftJoinAndSelect('group.users','user')
        .leftJoinAndSelect('message.sender','sender')
        .where('user.phone= :phone',{phone:phone})
        .andWhere('message.content Like :query',{query:`%${query}%`})
        .getMany()
    }
}