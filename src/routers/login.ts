import { Router } from 'express';
import { UserController } from '../controller/userController';

const login = Router()
const userController = new UserController()

login.use((req, res, next) => {
    console.log(req.path,req.query);
    next()
})
login.post('/', async (req, res) => {    
    const{phone,password}=req.body
    const users= await userController.all(req,res)
    
    const user=users.find(user=>user.phone==phone)
    
    if(user){
        if(user.password==password){
            res.json({user:user})
            
        }
        else res.json({error:'wrong pass'});
        
    }
    else res.json({error:'wrong phone'})

})
module.exports = login