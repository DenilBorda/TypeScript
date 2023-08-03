import mongoose from "mongoose";
import { productModel } from "../Model/productModel";

const productSchema = new mongoose.Schema<productModel>({
    title:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    }
})

const productCollection = mongoose.model<productModel>('Product',productSchema);

export default productCollection;