import express  from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './Routes/user.Routes';
const server :express.Application = express();
dotenv.config({
    path: "./.env"
})

const port = Number(process.env.PORTS);
const mongodb = String(process.env.mongodbs)

server.use(express.json());


server.use('api/user',userRoutes)

mongoose.connect(mongodb).then(()=>{
    console.log("DB Connected");
}).catch((err)=>{
    console.log(err)
})

server.listen(port,()=>{
    console.log(`server started at ${port}`);
})