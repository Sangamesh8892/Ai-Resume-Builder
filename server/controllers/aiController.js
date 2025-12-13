//Controller for enhancing resume summery
//POST: /api/ai/enhance-pro-sum

import { response } from "express";
import { model } from "mongoose"
import Resume from "../models/resumeModel.js";
import ai from "../configs/ai.js";

export const enhanceProfessionalSummery=async (req,res)=>{
    try{
        const {userContent}=req.body;
        
        if(!userContent){
            return res.status(400).json({message:'Missing required fields'})
        }

        const response=await ai.chat.completions.create({
        model: process.env.MODEL,
        messages: [
        { role: "system", content: "You are an expert resume and LinkedIn writer. Take the user’s content and transform it into a polished, concise, and impactful professional summary. Maintain the original meaning while improving clarity, structure, and tone. Remove errors and filler language, enhance professionalism, and ensure the summary is ATS-friendly. Do not add new information; simply refine what the user provides into a strong, well-written paragraph and return text no options or anything else" },
        {
            role: "user",
            content: userContent,
        },
    ],
        })

    const enhancedContent=response.choices[0].message;

    return res.status(200).json({enhancedContent})
    
    }catch(e){
                    if(e.status === 429 || e.message.includes('429') || e.constructor.name === 'RateLimitError'){
            return res.status(429).json({message: 'AI rate limit exceeded. Please try again tommorrow.'})
            }

        res.status(400).json({message: e.message})
    }
}

//controller for enhancing a resumes job description
// POST: /api/ai/enhance-job-desc

export const enhanceJobDescription=async (req,res)=>{
    try{
        const {userContent}=req.body
        
        if(!userContent){
            return res.status(400).json({message:'Missing required fields'})
        }

        const Response=await ai.chat.completions.create({
        model: process.env.MODEL,
        messages: [
        { role: "system", content: "You are an expert in crafting concise, high-impact job descriptions. Transform the user’s content into a polished, professional description using strong action verbs and quantifiable results wherever possible. Improve clarity, structure, and impact while preserving the original meaning. Remove filler and redundancy, keep it brief, optimize for ATS, and do not add new responsibilities or exaggerate beyond the provided content.Return only text no options or anything else" },
        {
            role: "user",
            content: userContent,
        },
    ],
        })

    const enhancedContent=Response.choices[0].message;

    return res.status(200).json({enhancedContent})
    
    }catch(e){
                

            if(e.status === 429 || e.message.includes('429') || e.constructor.name === 'RateLimitError'){
            return res.status(429).json({message: 'AI rate limit exceeded. Please try again tommorrow.'})
            }


        res.status(400).json({message: e.message})
    }
}

//Controller for uploading resume to the database
//POST: /api/ai/upload-resume

export const uploadResume=async (req,res)=>{
    try{
        const {resumeText, title}=req.body
        const userId=req.userId;
        
        if(!resumeText){
            return res.status(400).json({message:'Missing required fields'})
        }
        
        const systemPrompt="You are an expert AI agent to extract data from resume";
        const userPrompt=`Extract data from this resume: ${resumeText}
        Provide data in the following JSON format with no additional text before or after:
        professional_summary:{
            type:String,
            default:''
        },
        skills:[{
            type:String
        }],
        personal_info:{
            image:{type:String,default:''},
            full_name:{type:String,default:''},
            profession:{type:String,default:''},
            email:{type:String,default:''},
            phone:{type:String,default:''},
            location:{type:String,default:''},
            linkedin:{type:String,default:''},
            website:{type:String,default:''}
        },
        experience:[
            {
                company:{type:String},
                position:{type:String},
                start_date:{type:String},
                end_date:{type:String},
                description:{type:String},
                is_current:{type:Boolean}
            }
        ],
        projects:[
            {
                name:{type:String},
                type:{type:String},
                description:{type:String},
            }
        ],
        education:[
            {
                institution:{type:String},
                degree:{type:String},
                field:{type:String},
                graduation_date:{type:String},
                gpa:{type:String}
            }
        
        Note: Even if there is no image in uploaded resume, you need to add personal_info:{
            image:{type:String,default:''},
            with empty string
            `

        const response=await ai.chat.completions.create({
        model: process.env.MODEL,
        messages: [
        { role: "system", content: systemPrompt},
        {
            role: "user",
            content: userPrompt,
        },
    ],

    response_format: {type: 'json_object'}

            })

    const extractedData=response.choices[0].message.content;
    const parsedData=JSON.parse(extractedData)
    const newResume=await Resume.create({userId, title, ...parsedData})

    return res.json({resumeId: newResume._id})
    
    }catch(e){

        if(e.status === 429 || e.message.includes('429') || e.constructor.name === 'RateLimitError'){
            return res.status(429).json({message: 'AI rate limit exceeded. Please try again tommorrow.'})
        }

        res.status(400).json({message: e.message})
    }
}

//Controller for analyzing user saved resume 
//POST: /api/ai/analyze-resume

export const analyzeResumeSaved=async (req,res)=>{
    try{
        const {resumeText, jobDescription}=req.body
        const userId=req.userId;
        
        if(!resumeText){
            return res.status(400).json({message:'Missing required fields'})
        }
        
        const systemPrompt = `
            You are an ATS (Applicant Tracking System) simulation engine.
            You must behave like a strict resume parser and keyword matcher.
            Return ONLY valid JSON. Do not add explanations.
            `;

        const userPrompt = `
            RESUME TEXT:
            ${resumeText}

            JOB DESCRIPTION:
            ${jobDescription}

            Analyze how well the resume matches the job description.

            Return ONLY this JSON structure:
            {
            "score": number,
            "matchedSkills": string[],
            "missingSkills": string[],
            "suggestions": string[]
            }

            Rules:
            - score must be between 0 and 100
            - matchedSkills must come from job description and appear in resume
            - missingSkills must come from job description but NOT appear in resume 
            -suggestions must be very imp points which add value to the resume immensly
            - no markdown
            - no extra text
            `;


        const response=await ai.chat.completions.create({
        model: process.env.MODEL,
        messages: [
        { role: "system", content: systemPrompt},
        {
            role: "user",
            content: userPrompt,
        },
    ],

    response_format: {type: 'json_object'}

            })

    const data=response.choices[0].message.content;
    const parsedData=JSON.parse(data);

    const result={   //In case ai become sluggish and doesnt return response as intended   //defensive Approach
                score: Number(parsedData.score) || 0,
                matchedSkills: Array.isArray(parsedData.matchedSkills) ? parsedData.matchedSkills : [],
                missingSkills: Array.isArray(parsedData.missingSkills) ? parsedData.missingSkills : [],
                suggestions:  Array.isArray(parsedData.suggestions) ? parsedData.suggestions : []
    }

    return res.json(result)
    
    }catch(e){

        if(e.status === 429 || e.message.includes('429') || e.constructor.name === 'RateLimitError'){
            return res.status(429).json({message: 'AI rate limit exceeded. Please try again tommorrow.'})
        }

        res.status(400).json({message: e.message})
    }
}