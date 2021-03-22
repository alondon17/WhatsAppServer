import { createConnection } from "typeorm"
import cors = require('cors')
import express = require('express')
import ormConfig from './ormconfig'
export const createApp = () => createConnection(ormConfig)
    .then(async (connection) => {
        const login = require('./src/routers/login')
        const group = require('./src/routers/group')
        const message = require('./src/routers/message')
        const user = require('./src/routers/user')
        const app = express()
        app.use(cors())
        app.use(express.json())

        app.use('/login', login)
        app.use('/group', group)
        app.use('/message', message)
        app.use('/user', user)
        app.use('/', (req, res) => {
            res.send('lol fail')
        })
        const server = app.listen(3003, () => {
            console.log('yoohoo jew');
        })
        return { app, connection, server };

    })
