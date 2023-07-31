import { Request,Response,Router }  from "express";
import * as userController from "../Controller/userController";

const userRoutes:Router = Router()

userRoutes.post('/register',async(req:Request, res:Response)=>{
    await userController.createUser(req,res)
})


export default userRoutes;