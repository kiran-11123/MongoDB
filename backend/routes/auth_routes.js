import express from 'express'
const Auth_router=  express.Router();
import users_table from '../database/users.js';
import Authenticate_Token from '../middlewares/JWT_Authentication.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

Auth_router.post("/signin" , Authenticate_Token , async(req,res)=>{
     
    try{

        const {email , firstName , lastName , password} = req.body;

        const user_check = await users_data.find({email});
        
        if(!user_check){
             return res.status(404).json({
                message:"Email Not found"
             })
        }

        const password_check = await bcrypt.compare(password , user_check.password);

        if(!password_check) {
            return res.status(400).json({
                message:"Password is Wrong !! Try again"
            })
        }

        const token_details = {user_id : user_check._id ,user_email :user_check.email , user_firstName:user_check.firstName ,user_lastName:user_check.lastName}
        
        const token = jwt.sign(token_details ,process.env.SECRET_KEY,{expiresIn:"1h"})
        

        return res.status(200).json({
            message:"Signin Successfull !!",
            token:token
        })

        
    }
    catch(er){
         
        return res.status(500).json({
            message:"Error occurred while fetching the Details"
        })
    }
})


Auth_router.post("/signup" , async(req,res)=>{
     
    try{

        const {email , firstName , lastName , password } =req.body;

        const email_check = await users_data.find({email});

        if(email){
            return res.status(400).json({
                message:"Email Already Registered !! SignIn"
            })
        }

        const hashedPassword  =await bcrypt.hash(password ,10);

        const newUser = await new users_data({
            email:email,
            firstName:firstName,
            lastName:lastName,
            password:hashedPassword,
            
        })

        newUser.save();

        return res.status(200).json({
            message:"User Registered Successfully !"
        })
        
    }
    catch(er){
         
        return res.status(500).json({
            message:"Error occurred while fetching the Details"
        })
    }
})










export default Auth_router;