import { Message } from './../entity/message';
import { Group } from './../entity/group';
import { getRepository } from "typeorm";
import { User } from '../entity/user';
import { Request,Response } from 'express';
import { group } from 'console';

export class MessageController{
    private groupRepository=getRepository(Group)
    private messageRepository=getRepository(Message)
    private userRepository=getRepository(User)
    async getGroupsByUser(request:Request,response:Response){
        
        const user=(await this.userRepository.find()).find(per=>per.phone===request.body.phone)

        const help3= await this.userRepository.createQueryBuilder('user')
        .where('user.phone= :phone',{phone:request.body.phone})
        .leftJoinAndSelect("user.groups","group")
        .leftJoinAndSelect('group.messages','groupmessages')
        .leftJoinAndSelect('groupmessages.sender','groupmessagessenders')
        .leftJoinAndSelect('group.users','groupusers')
        // .select("*")
        .getMany()

        // console.log("help1",help1);
        // console.log("help2",help2);
        return help3
    }
    async save(request:Request,response:Response){
        const {phone,content,groupId}=request.body
        const addedMessage=new Message()
        const group=(await this.groupRepository.findOne(groupId))
        const sender=(await this.userRepository.findOne(phone))
        addedMessage.sender=sender!
        addedMessage.group=group!
        addedMessage.content=content
        
        await this.messageRepository.save(addedMessage)
    }
    async search(request:Request,response:Response){
        const {query,phone}:{query:string,phone:string}=request.body
        console.log(query,phone);
        
        const messages=await this.messageRepository.createQueryBuilder('message')
        .leftJoinAndSelect('message.group','group')
        .leftJoinAndSelect('group.users','user')
        .leftJoinAndSelect('message.sender','sender')
        .where('user.phone= :phone',{phone:phone})
        .andWhere('message.content Like :query',{query:`%${query}%`})
        .getMany()
        console.log(messages);
         return messages
    }
}