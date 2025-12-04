import User from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Resume from "../models/resumeModel.js";


//controller for user registration
//POST: '/api/users/register'
const generateToken= (userId)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'})
    return token;
}

export const registerUser= async (req,res)=>{

    try{
        const {name,email,password}=req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message:"Missing Required field"
            })
        }

        const user= await User.findOne({email})
        if(user){
            return res.status(400).json({
                message:"User already exist"
            })
        }
        
        //hash the passoword

        const hashedPassword= await bcrypt.hash(password,10);

        const newUser=await User.create({
            name,email,password: hashedPassword
        })

        //return success message
        const token=generateToken(newUser._id)
        newUser.password=undefined;

        return res.status(201).json({
            message:"user created successfully",
            token,
            user: newUser
        })

        
    }catch(e){
        return res.status(400).json({
            message:e.message
        })
    }
}

//controller for user login
// Post: /api/users/login

export const loginUser= async (req,res)=>{

    try{
        const {email,password}=req.body;

        if( !email || !password){
            return res.status(400).json({
                message:"Missing Required field"
            })
        }

        const user= await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"User or Password invalid"
            })
        }
        
        //verify the passowrd
        if(!user.comparePassword(password)){
            return res.status(400).json({
                message:"User or Password invalid"
            })
        }

        //return success message
        const token=generateToken(user._id)
        newUser.password=undefined;

        return res.status(200).json({
            message:"Login Successfull",
            token,
            user
        })

        
    }catch(e){
        return res.status(400).json({
            message:e.message
        })
    }
}


//Controller for getting user by id
//GET: /api/users/data

export const getuserById= async (req,res)=>{

    try{
        const {userId}=req.userId;

        //check if user exist
        const user= await User.findById(userId)
        if(!user){
            return res.status(404).json({
                message:"User Not Found"
            })
        }
        
        //return user
        user.password=undefined;
        return res.status(200).json({
            user
        })
    }catch(e){
        return res.status(400).json({
            message:e.message
        })
    }
}

//Controller for getting user resumes
//GET: /api/users/resumes

export const getUserResumes= async (req,res)=>{
    try{

        const userId=req.userId;

        //return user resumes
        const resumes= await Resume.find({userId})

        return res.status(200).json({
            resumes
        })
    }catch(e){
         return res.status(400).json({
            message:e.message
        })
    }
}