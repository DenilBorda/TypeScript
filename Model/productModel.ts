import mongoose from "mongoose";

export interface productModel{
    _id?:string,
    title:String,
    description:String,
    price:Number,
    quantity:Number
}