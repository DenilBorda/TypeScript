import mongoose from "mongoose"
import{userModel} from "../Model/userModel"

const userSchema = new mongoose.Schema<userModel>({
    FirstName:{
        type:String,
    },
    LastName:{
        type:String,
    },
    Age:{
        type:Number

    },
    Address:{
        type:String
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
});


const userCollection = mongoose.model<userModel>('User',userSchema);
export default userCollection;
