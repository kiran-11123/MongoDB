import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
const app = express();
dotenv.config();
app.use(express.json());




app.get("/" , (req,res)=>{
     
    return res.json({
          
       message:"this is get request"
    })
})











app.listen(5000,()=>{
    console.log("Server is running")
})