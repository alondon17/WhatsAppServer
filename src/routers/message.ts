import { MessageController } from './../controller/messageController';
import { Router } from 'express';

const message = Router()
const messageController = new MessageController()


message.post('/search', async (req, res) => {
    res.json({ messages: await messageController.search(req, res) })
})
message.post('/', async (req, res) => {
     await messageController.save(req, res)
    res.end()
})
module.exports = message