import { Briefcase, Loader2, Plus, Sparkle, Trash } from 'lucide-react'
import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import toast from "react-hot-toast"
import api from '../../configs/api';

const ExperienceForm = ({data,onChange}) => {

    const addExperience=()=>{
        const newExperience={
            company: "",
            position:"",
            start_date:"",
            end_date:"",
            description:"",
            is_current:false
        };
        onChange([...data,newExperience])
    }

    const removeExperience=(index)=>{
        const updated=data.filter((_,i)=>i !==index);
        onChange(updated)
    }

    const updateExperience=(index,field,value)=>{
        const updated=[...data];
        updated[index]= { ...updated[index],[field]:value}
        onChange(updated)
    }

    const {token}=useSelector(state=>state.auth)
    const [generatingIndex,setGeneratingIndex]=useState(-1)
    const generateDescription= async(index)=>{
            setGeneratingIndex(index)
            const experience=data[index]
            const prompt=`Enhance this job description ${experience.description} for the position of ${experience.position} 
            at ${experience.company}`
        try {
            const res=await api.post('/api/ai/enhance-job-desc',{userContent: prompt}, {headers:{Authorization:token}})
            updateExperience(index,"description",data.enhancedContent)
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message)
        }
        finally{
            setGeneratingIndex(-1)
        }
    }

  return (
    <div className="p-4">
        <div className='space-y-6'>

            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Professional Experience</h3>
                    <p className="text-sm text-gray-600">Add your work Experience</p>
                </div>

                <button
                    onClick={addExperience}
                    type='button'
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:brightness-110 transition"
                >
                    <Plus className="size-4"/>
                    Add Experience
                </button>
            </div>

            {data.length===0 ? (
                <div className="text-center py-10 border border-dashed rounded-xl bg-gray-50">
                    <Briefcase className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                    <p className="text-gray-700 font-medium">No Work Experience Added yet</p>
                    <p className='text-sm text-gray-600'>Click Add experience to get started</p>
                </div>
            ) : (
                <div className='space-y-6'>

                    {data.map((experience,index)=>(

                        <div 
                            key={index} 
                            className="p-5 rounded-xl border border-gray-200 shadow-sm bg-white space-y-4"
                        >
                            <div className='flex justify-between items-start'>
                                <h4 className="font-semibold text-gray-800">Experience #{index +1}</h4>

                                <button 
                                    onClick={()=>removeExperience(index)}
                                    className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
                                >
                                    <Trash className='size-4'/>
                                </button>
                            </div>

                            <div className='grid md:grid-cols-2 gap-4'>

                                <input 
                                    type='text'  
                                    placeholder='Company Name'
                                    value={experience.company || ''}
                                    onChange={(e)=>updateExperience(index,"company",e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />

                                <input 
                                    type='text'  
                                    placeholder='Job Title'
                                    value={experience.position || ''}
                                    onChange={(e)=>updateExperience(index,"position",e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />

                                <input 
                                    type='month'
                                    value={experience.start_date || ''}
                                    onChange={(e)=>updateExperience(index,"start_date",e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />

                                <input 
                                    type='month'
                                    value={experience.end_date || ''}
                                    onChange={(e)=>updateExperience(index,"end_date",e.target.value)}
                                    disabled={experience.is_current}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 disabled:bg-gray-100 disabled:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />

                                <label className="flex items-center gap-2 mt-2">
                                    <input 
                                        type="checkbox" 
                                        checked={experience.is_current || false}
                                        onChange={(e)=>{updateExperience(index,"is_current",e.target.checked ? true : false)}}
                                        className='size-4 accent-indigo-600'
                                    />
                                    <span className='text-sm text-gray-700'>Currently Working here</span>
                                </label>

                                <div className='space-y-2 col-span-2'>
                                    
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-gray-700">Job Description</label>
                                        
                                        <button 
                                        type='button'
                                        className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={()=>generateDescription(index)}
                                        disabled={generatingIndex === index || !experience.position || !experience.company}
                                        >
                                            {generatingIndex===index ? (<Loader2 className='size-4 animate-spin'/>):(<Sparkle className='w-3 h-3'/>)}
                                            {generatingIndex===index ? "Generating...":"Enhance With AI"}
                                            
                                        </button>
                                    </div>

                                    <textarea 
                                        value={experience.description || ""} 
                                        placeholder='Describe your key responsibilities and achievements'
                                        onChange={(e)=>updateExperience(index,"description",e.target.value)}
                                        className="w-full min-h-[90px] px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    />
                                </div>

                            </div>
                        </div>

                    ))}

                </div>
            )}
        </div> 
    </div>
  )
}

export default ExperienceForm
