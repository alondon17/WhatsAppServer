import { MessageController } from './../controller/messageController';
import { GroupController } from './../controller/groupController';
import { Router } from 'express';
import { UserController } from '../controller/userController';
const message = Router()
const gc = new GroupController()
const mc = new MessageController()


message.post('/search', async (req, res) => {
res.json({messages:await mc.search(req,res)})
})
message.post('/', async (req, res) => {
mc.save(req,res)
res.end()
})
module.exports = message