import mongoose from "mongoose";

const user_schema = new mongoose.Schema({

    username:{type:String,required:true},
      
    email:{type:String , required:true},
    password :{type:string ,required:true}

})

const users_table = mongoose.model("users" , user_schema);


export default users_table;