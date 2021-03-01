import { Router } from 'express';
import { UserController } from '../controller/userController';
const login = Router()
const uc = new UserController()
login.use((req, res, next) => {
    console.log(req.path,req.query);
    next()
})
// login.get('/set', async (req, res) => {
//     console.log('a');

//     let v = await uc.save(req, res, () => { })
//     res.end(JSON.stringify(v))
// })
login.post('/', async (req, res) => {
    console.log('tr',req.body);
    
    const{phone,password}=req.body
    const users= await uc.all(req,res)
    console.log(users);
    
    const user=users.find(user=>user.phone==phone)
    console.log(user);
    
    if(user){
        if(user.password==password){
            res.json({user:user})
            
        }
        else res.json({error:'wrong pass'});
        
    }
    else res.json({error:'wrong phone'})

})
module.exports = login