import { getRepository, getConnection } from "typeorm"; import { NextFunction, Request, Response } from "express"; import { User } from "../entity/user";

export class UserController {

    private userRepository = getConnection().getRepository(User);

    async all(request: Request, response: Response, next?: NextFunction) {
        return this.userRepository.find({relations:['groups']});
    }

    async one(request: Request, response: Response, next?: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }
    async update(request: Request, response: Response, next?: NextFunction) {
        const user:User=request.body.user
        console.log('user',user);
        
        const ret = await this.userRepository.save({phone:user.phone,about:user.about,name:user.name});
        console.log(ret);
        return ret
        
    }

    async save(request: Request, response: Response, next?: NextFunction) {
        console.log('v');

        return this.userRepository.save({
            phone: '+972-54-755-' + request.query.phone,
            name: request.query.name?.toString() || 'o', password: 'ga', about: 'jj', groups: []
        })
            .then(() => this.userRepository.createQueryBuilder("user")
            .leftJoinAndSelect("user.groups",'group').getMany());
    }

}