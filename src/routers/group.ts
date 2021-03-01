import { GroupController } from './../controller/groupController';
import { Router } from 'express';
import { UserController } from '../controller/userController';
const group = Router()
const gc = new GroupController()

group.post('/new', async (req, res) => {
    const grg= await gc.save(req,res)
    // console.log('grg',grg);
    
            res.json({group:grg}) 
})
group.post('/', async (req, res) => {
    const grg= await gc.getGroupsByUser(req,res)
    // console.log('grg',grg);
    
            res.json({groups:grg[0].groups}) 
})
module.exports = group