import { Router } from 'express';
import { UserController } from '../controller/userController';
import { User } from '../entity/user';

const login = Router()
const userController = new UserController()

login.use((req, res, next) => {
    console.log(req.path,req.query);
    next()
})
login.post('/signin', async (req, res) => {    
    const{phone,password,name}=req.body

    
    const user=await User.findOne(phone)
    
    if(!user){
        
            res.send({user:await userController.save({phone,name,password,about:'Hello!'})})
            
  
        
    }
    else res.send({error:'User already exists'})

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