import { getConnection } from "typeorm"; 
import { NextFunction, Request, Response } from "express"; 
import { User } from "../entity/user";

export class UserController {

    private userRepository = getConnection().getRepository(User);

    public async all(request: Request, response: Response, next?: NextFunction) {
        return await this.userRepository.find({ relations: ['groups'] });
    }

    public async one(request: Request, response: Response, next?: NextFunction) {
        return await this.userRepository.findOne(request.params.id);
    }
    public async update(request: Request, response: Response, next?: NextFunction) {
        const user: User = request.body.user
        console.log(user);

        return await this.userRepository.save({ phone: user.phone, about: user.about, name: user.name });
    }
    public async save(user: any): Promise<User> {
        const { phone, about, name, password } = user
        return await this.userRepository.save({ phone, about, name, password })
    }
    public async delete(user: User) {

        return await this.userRepository.delete(user)
    }

}