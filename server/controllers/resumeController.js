import { response } from "express";
import imagekit from "../configs/imageKit.js";
import Resume from "../models/resumeModel.js";
import fs from "fs";
//controller for resume registration
//POST: '/api/resumes/create'

export const createResume= async(req,res)=>{
    try{ 
        const userId=req.userId;
        const {title}=req.body;

        //create new resume
        const newResume= await Resume.create({userId,title})
        //return success message

        return res.status(201).json({message: "Resume created successfully",
            resume: newResume
        })

    }catch(e){
        return res.status(400).json({
            message:e.message
        })
    }
}

//controller for deleting a resume
//Delete: /api/resumes/delete

export const deleteResume= async(req,res)=>{
    try{ 
        const userId=req.userId;
        const {resumeId}=req.params;


        await Resume.findOneAndDelete({userId,_id:resumeId})

        //return success message
        return res.status(201).json({message: "Resume deleted successfully"})

    }catch(e){
        return res.status(400).json({
            message:e.message
        })
    }
}

//controller for get user resume by id
//Get: /api/resumes/get
export const getResumeById= async(req,res)=>{
    try{ 
        const userId=req.userId;
        const {resumeId}=req.params;


        const resume=await Resume.findOne({userId,_id:resumeId})
        if(!resume){
            return res.status(404).json({message:"Resume Not Found"})
        }

        resume.__v=undefined;
        resume.createdAt=undefined;
        resume.updatedAt=undefined;

        //return success message
        return res.status(200).json({message: "Resume Fetched successfully",
            resume
        })

    }catch(e){
        return res.status(400).json({
            message:e.message
        })
    }
}

//controller for get user resume by id public
//Get: /api/resumes/public

export const getPublicResumeById= async(req,res)=>{
    try{ 
        const {resumeId}=req.params;


        const resume=await Resume.findOne({public:true, _id:resumeId})

        if(!resume){
            return res.status(404).json({message:"Resume Not Found"})
        }

        //return success message
        return res.status(200).json({
            resume})

    }catch(e){
        return res.status(400).json({
            message:e.message
        })
    }
}

//controller for updating a resume
//Get: /api/resumes/update

export const updateResume= async(req,res)=>{
    try{ 

        const userId=req.userId;
        const {resumeId,resumeData,removeBackground}=req.body;
        const image=req.file;
        let resumeDataCopy;
        if(typeof resumeData==="string"){
             resumeDataCopy=await JSON.parse(resumeData);
        }else{
            resumeDataCopy= structuredClone(resumeData);
        }


        if(image){

            const imageBufferData=fs.createReadStream(image.path);

            const response = await imagekit.files.upload({
            file: imageBufferData,
            fileName: 'resume.png',
            folder:'user-resumes',
            transformation:{
                pre:removeBackground 
                ? 'w-300,h-300,fo-face,z-0.6,e-bgremove' 
                : 'w-300,h-300,fo-face,z-0.6'
        }
            
            
        })
        resumeDataCopy.personal_info.image=response.url; 
        }

        

        const resume=await Resume.findOneAndUpdate({userId, _id:resumeId }, resumeDataCopy,{new:true});

        //return success message
        return res.status(200).json({
            message:"Saved Successfully",
            resume
        })

    }catch(e){
        return res.status(400).json({
            message:e.message
        })
    }
}
