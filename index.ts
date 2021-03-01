// import pgPromise = require('pg-promise')
import { createConnection } from 'typeorm';
import fs = require('fs')
import cors = require('cors')
import express = require('express')



// const pgp = pgPromise()
const init_sql = fs.readFileSync('./sql/init.sql').toString()
// const db = pgp('postgres://postgres:postgres@localhost:5432/postgres')
// db.any(init_sql)
console.log('success');
createConnection().then(async (connection) => {
    // console.log(connection);
    const login = require('./src/routers/login')
    const group = require('./src/routers/group')
    const message = require('./src/routers/message')
    const user = require('./src/routers/user')
    
    const app = express()
    app.use(cors())
    app.use(express.json())
    app.use((req,res,next)=>{
        console.log(req.path,req.query,req.body);
        next()
    })
    app.use('/login', login)
    app.use('/group', group)
    app.use('/message', message)
    app.use('/user', user)
    app.listen(3003, () => {
        console.log('yoohoo jew');
    })
})
