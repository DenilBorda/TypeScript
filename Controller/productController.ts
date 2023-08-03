import { Request,Response } from "express";
import mongoose from "mongoose";
import productCollection from "../Schema/productSchema";
import { productModel } from "../Model/productModel";


export const addProduct = async(req:Request,res:Response)=>{
    try {
    const{title,decription,price,quantity} = req.body;

    const products:productModel | null = await productCollection.findOne({title:title});
    if(products){
        return res.json({msg:'Product Already Exist'});
    }

    const newProduct = await productCollection.create({
        title:title,
        decription:decription,
        price:price,
        quantity:quantity
    });

    const product = await new productCollection(newProduct).save();
    
    res.status(201).json({newProduct,msg:'Product Added'});
    } catch (error) {
        console.log(error);
        res.json({msg:'server error'});
    }
    
};

exports.getAllProduct = async(req:Request,res:Response)=>{
   try {
        const product :any = await productCollection.find();
        res.status(200).json(product)
   } catch (error) {
        console.log(error);
        res.json({msg:'server error'});
   }
};

exports.getProduct = async(req:Request,res:Response)=>{
    try {

        const id = await req.params.id;
        const mongoProductId  = new mongoose.Types.ObjectId(id);
        
        const product = await productCollection.findById(id);
        if(!product){
            res.json({msg:'Product Not Found'});
        }
        res.json(product)   
    } catch (error) {
       console.log(error);
       res.json({msg:'server error'}); 
    }
};

exports.updateProduct = async(req:Request,res:Response)=>{
    try {
        const{title,description,price,quantity}= req.body
        const id = await req.params.id;
        const mongoProductId = new mongoose.Types.ObjectId(id)
        const product = await productCollection.findById(id);
        if(!product){
            res.json({msg:'Product Not Found'});
        }
        const newProduct:productModel = {
            title:title,
            description:description,
            price:price,
            quantity:quantity
        }

        const updatedProduct  = await productCollection.findByIdAndUpdate(mongoProductId,{$set:newProduct},{new:true});
        
        res.status(200).json({updatedProduct,msg:'Product Updated'});
    } catch (error) {
        console.log(error);
        res.json({msg:'server error'}); 
    }
};

exports.deleteProduct = async(req,res)=>{
    try {
        const id = await req.params.id;

        const mongoProductId = new mongoose.Types.ObjectId(id);

        const product = await productCollection.findById(id);
        if(!product){
            res.json({msg:'Product Not Found'});
        }
        const deletedProduct = await productCollection.findByIdAndDelete(mongoProductId);
        res.status(200).json({msg:'Product Deleted'});
    } catch (error) {
        console.log(error)
        res.json({msg:'server error'});
    }
    
};