import mongoose from "mongoose";

export interface userModel{
    _id?:string,
    FirstName:string,
    LastName:string,
    Age:Number,
    Address:string,
    Email:string,
    Password:string
}