import { GraduationCap,Plus,Trash } from 'lucide-react';
import React from 'react'

const EducationForm = ({data,onChange}) => {
    const addEducation=()=>{
        const newEducation={
            institution: "",
            degree:"",
            field:"",
            end_date:"",
            graduation_date:"",
            gpa:""
        };
        onChange([...data,newEducation])
    }

    const removeEducation=(index)=>{
        const updated=data.filter((_,i)=>i !==index);
        onChange(updated)
    }

    const updateEducation=(index,field,value)=>{
        const updated=[...data];
        updated[index]= { ...updated[index],[field]:value}
        onChange(updated)
    }


  return (
    <div className="p-4">
        <div className='space-y-6'>

            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Education</h3>
                    <p className="text-sm text-gray-600">Add your work education details</p>
                </div>

                <button
                    onClick={addEducation}
                    type='button'
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:brightness-110 transition"
                >
                    <Plus className="size-4"/>
                    Add Education
                </button>
            </div>

            {data.length===0 ? (
                <div className="text-center py-10 border border-dashed rounded-xl bg-gray-50">
                    <GraduationCap className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                    <p className="text-gray-700 font-medium">No Education Added Yet</p>
                    <p className='text-sm text-gray-600'>Click Add Education to get started</p>
                </div>
            ) : (
                <div className='space-y-6'>

                    {data.map((education,index)=>(

                        <div 
                            key={index} 
                            className="p-5 rounded-xl border border-gray-200 shadow-sm bg-white space-y-4"
                        >
                            <div className='flex justify-between items-start'>
                                <h4 className="font-semibold text-gray-800">Education #{index +1}</h4>

                                <button 
                                    onClick={()=>removeEducation(index)}
                                    className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
                                >
                                    <Trash className='size-4'/>
                                </button>
                            </div>

                            <div className='grid md:grid-cols-2 gap-4'>

                                <input 
                                    type='text'  
                                    placeholder='Institution Name'
                                    value={education.institution || ''}
                                    onChange={(e)=>updateEducation(index,"institution",e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />

                                <input 
                                    type='text'  
                                    placeholder='Degree'
                                    value={education.degree || ''}
                                    onChange={(e)=>updateEducation(index,"degree",e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />

                                <input 
                                    type='text'  
                                    placeholder='Field of Study '
                                    value={education.field || ''}
                                    onChange={(e)=>updateEducation(index,"field",e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />

                                <div className="relative">
                                    <span className="absolute -top-2 right-3 inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-indigo-600 shadow-sm">
                                        Graduation Date
                                    </span>
                                    <input 
                                        type='month'
                                        value={education.graduation_date || ''}
                                        onChange={(e)=>updateEducation(index,"graduation_date",e.target.value)}
                                        placeholder='Select graduation month'
                                        className="w-full px-3 pt-5 pb-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    />
                                </div>

                                <input 
                                    type='text'
                                    value={education.gpa || ''}
                                    onChange={(e)=>updateEducation(index,"gpa",e.target.value)}
                                    placeholder='CGPA (optional)'
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />

                            </div>
                        </div>

                    ))}

                </div>
            )}
        </div> 
    </div>
  )
}

export default EducationForm