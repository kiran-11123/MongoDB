import express from 'express'
const Course_router  = express.Router();
import Course from '../database/course.js'; 
import Course_purchase from '../DataBase/Purchase.js';

Course_router.get("/allcourses" , async(req,res)=>{
     
    try{

        const  data = await Course.find();

        if(data.length===0){
            return res.status(200).json({
                message:"No Courses Avalilable",
                CourseData :[]
            })
        }

        return res.status(200).json({
            message:"Data Fetched Successfully",
            CourseData : data
        })



    }
    catch(er){
         
        return res.status(500).json({
           message:"Error occureed while Creating the courses"
        })
    }
})

Course_router.get("/purchasedcourses" , async (req,res)=>{
     
    try{

         
        const user_id = req.user.user_id;

        const find_purchases = await Course_purchase.find({
            userId: user_id
        })

        if(find_purchases.length===0){


            return res.status(400).json({
                message:"No courses found"
            })
        }


        return res.status(200).json({
            message:"Data feteched successfully",
            data:find_purchases
        })


         
        
    }
    catch(er){
         
        return res.status(500).json({
            message:"Error occurred while fetching the Details"
        })
    }
})


Course_router.post("/coursepurchase" , async (req,res)=>{
     
    try{

         const user_id = req.user.user_id
        const course_id = req.body.course_id;

        const find_course = await Course.find({_id:course_id});
        
        if(!find_course) return res.status(400).json({
            message:"Course not found"
        })
         

        const find_purchase = await Course_purchase.find({_id:course_id});

        if(find_purchase){
             return res.status(400).json({
                message:"Course already purchased"
             })
        }

        await Course_purchase.create({
            user_id,
            course_id,
        })

        res.status(200).json({
            message:"Course Purchased Successfully"
        })


        
    }
    catch(er){
         
        return res.status(500).json({
            message:"Error occurred while fetching the Details"
        })
    }
})

export default Course_router;