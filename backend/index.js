import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import ConnectDB from './database/db.js';
const app = express();
dotenv.config();
app.use(express.json());


ConnectDB();











app.listen(5000,()=>{
    console.log("Server is running")
})