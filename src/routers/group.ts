import { GroupController } from './../controller/groupController';
import { Router } from 'express';
const group = Router()
const groupController = new GroupController()

group.post('/new', async (req, res) => {
    const newGroup = await groupController.save(req, res)
    res.json({ group: newGroup })
})
group.post('/', async (req, res) => {
    const groups = await groupController.getGroupsByUser(req, res)
    res.json({ groups: groups.length>0&& groups[0].groups })
})
module.exports = group