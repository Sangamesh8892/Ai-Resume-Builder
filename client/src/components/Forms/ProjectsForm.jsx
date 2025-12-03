import React from 'react'
import {Plus,Trash2} from 'lucide-react'
const ProjectsForm = ({data,onChange}) => {

     const addProject=()=>{
        const newProject={
            name: "",
            type:"",
            description:""
        };
        onChange([...data,newProject])
    }

    const removeProject=(index)=>{
        const updated=data.filter((_,i)=>i !==index);
        onChange(updated)
    }

    const updateProject=(index,field,value)=>{
        const updated=[...data];
        updated[index]= { ...updated[index],[field]:value}
        onChange(updated)
    }


  return (

   
        <div className='space-y-6'>

            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
                    <p className="text-sm text-gray-600">Add your projects</p>
                </div>

                <button
                    onClick={addProject}
                    type='button'
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:brightness-110 transition"
                >
                    <Plus className="size-4"/>
                    Add Project
                </button>
            </div>

                <div className='space-y-6 mt-6'>

                    {data.map((project,index)=>(

                        <div 
                            key={index} 
                            className="p-5 rounded-xl border border-gray-200 shadow-sm bg-white space-y-4"
                        >
                            <div className='flex justify-between items-start'>
                                <h4 className="font-semibold text-gray-800">Project #{index +1}</h4>

                                <button 
                                    onClick={()=>removeProject(index)}
                                    className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
                                >
                                    <Trash2 className='size-4'/>
                                </button>
                            </div>

                            <div className='grid gap-3'>

                                <input 
                                    type='text'  
                                    placeholder='Project Name'
                                    value={project.name || ''}
                                    onChange={(e)=>updateProject(index,"name",e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />

                                <input 
                                    type='text'  
                                    placeholder='Project Type'
                                    value={project.type || ''}
                                    onChange={(e)=>updateProject(index,"type",e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />

                                <textarea
                                    rows={4}
                                    value={project.description || ''}
                                    onChange={(e)=>updateProject(index,"description",e.target.value)}
                                    placeholder='Describe your project...'
                                    className="w-full px-3 py-2 rounded-lg text-sm bg-white/80 px-4 py-3 text-sm text-gray-800 shadow-inner resize-none border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />

                            </div>
                        </div>

                    ))}

                </div>
        </div> 
 

  )
}

export default ProjectsForm