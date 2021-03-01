import { Router } from 'express';
import { UserController } from '../controller/userController';
const user = Router()
const uc = new UserController()
user.use((req, res, next) => {
    console.log(req.path, req.query);
    next()
})
user.put('/', async (req, res) => {
    res.json({ user: await uc.update(req,res)})
})
user.get('/', async (req, res) => {
    res.json({ users: (await uc.all(req, res)).map(v => { return { ...v, password: undefined } }) })
})
module.exports = user