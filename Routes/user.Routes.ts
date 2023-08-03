import { Request,Response,Router }  from "express";
import * as userController from "../Controller/userController";
import  {getUser} from "../Middleware/auth"

const userRoutes:Router = Router()

userRoutes.post('/register',async(req:Request, res:Response)=>{
    await userController.createUser(req,res)
})

userRoutes.post('/login',async(req:Request, res:Response)=>{
    await userController.loginUser(req,res)
})

userRoutes.get('/me',async(req:Request,res:Response)=>{
    await userController.getUser(req,res)
})

userRoutes.post('/password',getUser,async(req:Request,res:Response)=>{
    await userController.changePassword(req,res)
})

userRoutes.post('/update',getUser,async(req:Request,res:Response)=>{
    await userController.updateUser(req,res)
})

export default userRoutes;