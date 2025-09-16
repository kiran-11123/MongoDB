import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();




const ConnectDB = async ()=>{
      
    
    try{
    await mongoose.connect("mongodb://localhost:27017/MongoDB",{
        useNewUrlParser: true,
           useUnifiedTopology: true,
    })

    console.log("Database connected");
    }  
    
    catch(er){

        console.log(er);
         
    }



}

export default ConnectDB;