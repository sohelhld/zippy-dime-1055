const express = require('express');
const {productModel} =require("../model/products.model")


const productRouter =express.Router()

productRouter.get("/",async(req,res)=>{
    const {To , from,company,maxPrice,minPrice,AirClass}=req.query
    const {pageno}=req.params
    const productStart = (pageno-1)*2
    try {
        //pagination 
        const productes = await productModel.find().skip(productStart).limit(3)
        //min max comments
        const query={}

        if(minPrice){
            query.price ={$gte:minPrice}
        }

        if(maxPrice){
          if(query.price){
            query.price.$lte=maxPrice
          }else{
            query.price={$lte:maxPrice}
          }   
        }

        if(AirClass){
            query.AirClass=AirClass
        }
        
        if(To){
            query.To=To
        }

        if(from){
           query.from=from   
          }



          if(company){
            query.company=company   
           }

        const products =await productModel.find(query)
        res.status(200).send(products)
    } catch (err) {
        res.status(400).send({"msg":err.message})
    }
})
productRouter.get("/top",async(req,res)=>{

    const {max_no_com}=req.body
    const {pageno}=req.params
    const productStart = (pageno-1)*2
    try {
        const productes = await productModel.find({$gte:max_no_com}).skip(productStart).limit(3)
        
    } catch (err) {
        res.status(400).send({"msg":err.message})
    }
})

productRouter.post("/add",async(req,res)=>{
    try {
        const product = new productModel(req.body)
        await product.save()
        res.status(200).send({"msg":"new product has been added"})
    } catch (err) {
        res.status(400).send({"msg":"err.message"})
    }
    
})

productRouter.patch("/update/:productID",async(req,res)=>{
    const {productID}=req.params
    const payload =req.body
    try {
        await productModel.findByIdAndUpdate({_id:productID},payload)
        res.status(200).send({"msg":" product has been updated"})
    } catch (err) {
        res.status(400).send({"msg":"err.message"})
    }
    
})

productRouter.delete("/delete/:productID",async(req,res)=>{
    const {productID}=req.params
    try {
        await productModel.findByIdAndDelete({_id:productID})
        res.status(200).send({"msg":" product has been deleted"})
    } catch (err) {
        res.status(400).send({"msg":"err.message"})
    }
})

module.exports={
    productRouter
}