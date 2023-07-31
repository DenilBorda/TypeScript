import { Request,Response } from 'express';
import mongoose from 'mongoose';
import { userModel } from '../Model/userModel';
import userCollection from '../Schema/userSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as auth from '../Middleware/auth'

export const createUser = async(req:Request,res:Response)=>{
    try {
        const {FirstName,LastName,Age,Address,Email,Password,Confrim_Password} = req.body;
        if(Password === Confrim_Password){
            const users = await userCollection.findOne({Email});
                if(!users){
                    return res.json({msg:'User Already Exist...'});
                }
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(Password,salt);
            const newUser:userModel = {
                FirstName:FirstName,
                LastName:LastName,
                Age:Age,
                Address:Address,
                Email:Email,
                Password:hashpassword
            }
       
      const user = await new userCollection(newUser).save();
        res.status(201).json({newUser,msg:'User created....'})
    }
    else{
           return res.json({msg:'Password and Confrim_Password not match '})
        } 
    }catch (error) {
        console.log(error);
        res.json({msg:'server error'});
    }
}

export const loginUser = async(req:Request,res:Response)=>{
    try {
        const {Email,Password} = req.body;
        const Exist :any = await userCollection.findOne({Email});
        if(!Exist){
            return res.json({msg:'User not Found'});
        }
        const Match = await bcrypt.compare(Password,Exist.Password as string);
        if(!Match){
            return res.json({msg:'User Password Incorrect'});
        }
        const jwtoken:String|undefined = process.env.jwtoken 
        const token = jwt.sign({userId:Exist._id},jwtoken as string,{expiresIn:'7d'});
        res.json({msg:'User is Login',token});
        
    } catch (error) {
        console.log(error);
        res.json({msg:'server error'});
    }
}

export const getUser = async(req:Request,res:Response)=>{
    try {
        const user = await auth.getUser(req,res)
        if(user){
            res.status(200).json(user) 
        }
    } catch (error) {
        console.log(error);
        res.json({msg:'server error'});
    }
}

export const changePassword = async(req:Request,res:Response)=>{
    try {
        const {Password,Confrim_Password} = req.body
        if(Password === Confrim_Password){
            const getUser = await auth.getUser(req,res)
                if(!getUser){
                    return res.json({msg:'User not found'});
                }
                const salt = await bcrypt.genSalt(10);
                const hashpassword = await bcrypt.hash(Password,salt);
                const user:any = await auth.getUser(req,res);
                if(user){
                    user.Password = hashpassword;
                    const userObj = await user.save();
                    if(userObj){
                        return res.status(200).json({msg:'Password has been Changed'})                 
                    }
                }
        }
        else{
            return res.json({msg:'Password And Confrim_Password Is not Match '})
        }
        
    } catch (error) {
        console.log(error);
        res.json({msg:'server error'});
    }
}

export const updateUser = async(req:Request,res:Response)=>{
    try {
        const users = await auth.getUser(req,res)
        if(!users){
            return res.json({msg:'User not found'});
        }
        const updateUser :any = await auth.getUser(req,res)
        const theUser = await updateUser.save()
        if(updateUser){
            res.json(updateUser)
        }       
    } catch (error) {
        console.log(error)
        res.json({msg:'server error'});
    }
}

