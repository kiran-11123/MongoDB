import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
const admin_key = process.env.admin_key;

const secretKey = process.env.SECRETKEY


function Authenticate_Token_User(req,res){

    try{

        const header = req.headers['authorization'];
        const token = header && header.split(' ')[1];

        if(!token) return res.status(400).json({message:"Token is required"})

        jwt.verify(token,secretKey,(err,user)=>{

            if(err) return res.status(403).json({message:"Token is invalid"})   
            console.log("User authenticated");

            req.user = user; 
            next();

        })

    }
    catch(er){
        console.log(er);
        return res.status(500).json({
            message:"something went wrong while handling the token"
        })
    }

}



function Authenticate_Token_Admin(req,res){

    try{

        const header = req.headers['authorization'];
        const token = header && header.split(' ')[1];

        if(!token) return res.status(400).json({message:"Token is required"})

        jwt.verify(token,admin_key,(err,user)=>{

            if(err) return res.status(403).json({message:"Token is invalid"})   
            console.log("User authenticated");

            req.user = user; 
            next();

        })

    }
    catch(er){
        console.log(er);
        return res.status(500).json({
            message:"something went wrong while handling the token"
        })
    }

}

export default { Authenticate_Token_User, Authenticate_Token_Admin };