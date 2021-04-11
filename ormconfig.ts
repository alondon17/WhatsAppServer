import { ConnectionOptions } from "typeorm";

const ormConfig:ConnectionOptions={ 
    "type": "postgres", 
    "host": process.env.POSTGRES_LINK||"localhost", 
    "port": 5432, 
    "username": process.env.POSTGRES_USERNAME||'postgres', 
    "password": process.env.POSTGRES_PASSWORD, 
    "database": process.env.POSTGRES_DATABASE||'postgres', 
    "synchronize": true, 
    "logging": false, 
    "entities": [
       "src/entity/**/*.ts" 
    ], 
    "migrations": [ "src/migration/**/*.ts" 
    ], 
    "subscribers": [ "src/subscriber/**/*.ts" 
    ], 
    "cli": { 
       "entitiesDir": "src/entity", "migrationsDir": "src/migration", "subscribersDir": "src/subscriber" 
    } 
 }
 console.log(ormConfig);
 
 export default ormConfig