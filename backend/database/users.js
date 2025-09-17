import mongoose from "mongoose";
import Course from "./course.js";

const user_schema = new mongoose.Schema({

    username:{type:String,required:true},
      
    email:{type:String , required:true},
    password :{type:string ,required:true},
    courses :[{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Course'   
    }]

})

const users_table = mongoose.model("users" , user_schema);


export default users_table;