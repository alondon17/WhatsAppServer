import { Router } from 'express';
import { UserController } from '../controller/userController';

const user = Router()
const userController = new UserController()

user.use((req, res, next) => {
    console.log(req.path, req.query);
    next()
})
user.put('/', async (req, res) => {
    res.json({ user: await userController.update(req,res)})
})
user.get('/', async (req, res) => {
    res.json({ users: (await userController.all(req, res)).map(arrUser => { return { ...arrUser, password: undefined } }) })
})
module.exports = user