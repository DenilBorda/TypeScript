import { Request,Response } from "express";
import mongoose from "mongoose";
import Jwt  from "jsonwebtoken";
import userCollection from "../Schema/userSchema";

export const getUser = async (req:Request , res:Response) =>{
    try {
        let Users: any = req.header['authorization'];

         Users = await Jwt.verify(Users,process.env.jwtoken as string)
        
        const userId  = Users.id;
        if (!userId) {
            return res.status(404).json({msg:'invalid user'})
        }

        const mongoId = new mongoose.Types.ObjectId(userId)
        
        const userObj:any = await userCollection.findById(mongoId)
        if (!userObj) {
            return res.status(404).json('user not found')
        }
        
    } catch (error) {
        console.log(error)
        res.status(404).json({msg:'server error'})
    }
}