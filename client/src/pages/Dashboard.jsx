import { EditIcon, FilePenLineIcon, LoaderCircleIcon, PlusIcon, TrashIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import {useSelector} from "react-redux"
import api from "../configs/api.js"
import toast from "react-hot-toast"
import pdfToText from "react-pdftotext"
import Loader from '../components/Loader.jsx'

const Dashboard = () => {

  const {user,token}= useSelector(state=>state.auth)

  const colors=["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]
  const [allResume,setALlResume]=useState([])
  const [showCreateResume,setShowCreateResume]=useState(false);
  const [showUploadResume,setShowUploadResume]=useState(false);
  const [title,setTitle]=useState('');
  const [resume,setResume]=useState(null);
  const [editResumeId,setEditResumeId]=useState('');
  const [isLoading,setIsLoading]=useState(false)

  const navigate=useNavigate();


  const loadAllResume= async()=>{
    try{
      const {data}=await api.get('/api/users/resumes',{headers:{
        Authorization:token
      }})
      setALlResume(data.resumes)
    }catch(err){
      toast.error(err?.response?.data?.message || err.message)    
    }
  }

  const createResume=async (e)=>{
      try{
        e.preventDefault();
        const {data}=await api.post('/api/resumes/create',{title},{headers: {
          Authorization: token
        }})
        setALlResume([...allResume,data.resume])
        setTitle('')
        setShowCreateResume(false)
        navigate(`/app/builder/${data.resume._id}`)
      }catch(err){
          toast.error(err?.response?.data?.message || err.message)      
      }
      
  }

  const uploadResume= async (e)=>{
    setIsLoading(true);
    try{
      e.preventDefault()
      const resumeText= await pdfToText(resume)
      const {data}=await api.post('/api/ai/upload-resume',{title,resumeText},{headers: {
          Authorization: token
        }})
      setTitle('')
      setResume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)
      toast.success("Resume Uploaded Successfully")
    }catch(err){

      
          toast.error(err?.response?.data?.message || err.message) 
     
           
    }
    setIsLoading(false);
  }

  const editTitle= async (e)=>{
    try{
      e.preventDefault();
      const {data}=await api.put(`/api/resumes/update`,{resumeId: editResumeId, resumeData:{title}},{headers: {
          Authorization: token
        }})
      setALlResume(allResume.map(resume=>resume._id === editResumeId ? {...resume, title} : resume))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message)
    }catch(err){
      toast.error(err?.response?.data?.message || err.message) 

    }

  }

  const deleteResume= async (resumeId)=>{
    
try{
      const confirm=window.confirm('Are you sure you want to delte this resume')
    if(confirm){
      const {data}=await api.delete(`/api/resumes/delete/${resumeId}`,{headers: {
          Authorization: token
        }})
      setALlResume(allResume.filter(resume=>resume._id !== resumeId))
      toast.success(data.message)
    }
}catch(err){
    toast.error(err?.response?.data?.message || err.message)  
  }
  }

  useEffect(()=>{
    loadAllResume()
  },[])

  

  

  return (
    <div>
 
      <div className='max-w-7xl mx-auto px-4 py-8'>
      <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>Welcome, {user.name}</p>

       <div className='flex gap-4'>
        <button onClick={()=>setShowCreateResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center
              justify-center rounded-lg gap-2 text-slate-600 border border-dashed
          border-slate-300 group hover:border-indigo-500 hover: shadow-lg transition-all
              duration-300 cursor-pointer'>
          <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full' />
          <p className='text-sm group-hover: text-indigo-600 transition-all
            duration-300'>Create Resume</p>
        </button>
         <button disabled={isLoading} onClick={()=>setShowUploadResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center
              justify-center rounded-lg gap-2 text-slate-600 border border-dashed
          border-slate-300 group hover:border-indigo-500 hover: shadow-lg transition-all
              duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'>
          <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-rose-300 text-white rounded-full' />
          <p className='flex justify-center gap-2 items-center text-sm group-hover: text-indigo-600 transition-all
            duration-300'>
              {isLoading ? (<>
                
                Uploading... <LoaderCircleIcon className='animate-spin size-4 text-indigo-600'/>
              </>): "Upload Existing"}
            </p>
        </button>
        </div> 

        <hr className='border-slate-300 my-6 sm:w-[305px]' />

        <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
          {
            allResume.map((resume,index)=>{
              const baseColor=colors[index % colors.length];
              return(
             <button key={index} onClick={()=>navigate(`/app/builder/${resume._id}`)} className="relative w-full sm:max-w-36 h-48 flex
                flex-col items-center justify-center rounded-lg gap-2 border group
                  hover:shadow-lg transition-all duration-300 cursor-pointer" style={{background:`linear-gradient(135deg,${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + '40'}}>
                    
                    <FilePenLineIcon className='size-7 group-hover:scale-105 transition-all' style={{color: baseColor}} />
                    <p className='className=text-sm group-hover:scale-105 transition-all px-2
                      text-center' style={{ color: baseColor }}>{resume.title}</p>
                      <p className='absolute bottom-1 text-[9.5px] text-slate-400
                          group-hover: text-slate-500 transition-all duration-300 px-2
                      text-center' style={{ color: baseColor+ '90' }}>Updated on {new Date(resume.updatedAt).toDateString()}</p>

                  <div onClick={e=>e.stopPropagation()} className='absolute top-1 right-1 group-hover:flex items-center hidden' >
                   <TrashIcon onClick={()=>deleteResume(resume._id)} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors'  />       
                   <EditIcon onClick={()=>{setEditResumeId(resume._id), setTitle(resume.title) }} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors'  />                                                               
                  </div>
                </button>
              )
            })
          }
        </div>
            {showCreateResume && ( 
              <form onSubmit={createResume} onClick={()=>setShowCreateResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50
              z-10 flex items-center justify-center'>
              <div onClick={e=>e.stopPropagation()} className='relative bg-gradient-to-r from-slate-50 to-indigo-200 border shadow-md rounded-lg w-full max-w-sm p-6'>
                  <h2 className='text-xl font-bold mb-4 text-center'>Create a Resume</h2>
                  <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title} placeholder='Enter resume title' className='w-full
                        px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required/>
                  <button className='w-full py-2 bg-gradient-to-l from-[#ffb3c6] to-[#0077b6] text-white rounded 
                    hover:opacity-70 transition-all'>Create Resume</button>
                  <XIcon className='absolute top-4 right-4 text-slate-400
                        hover: text-slate-600 cursor-pointer transition-colors' onClick={() =>
                  {setShowCreateResume(false); setTitle('') }}/> 
                </div>                          
             </form> )}

          {showUploadResume && ( 
              <form onSubmit={uploadResume} onClick={()=>setShowUploadResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50
              z-10 flex items-center justify-center'>
            <div onClick={e=>e.stopPropagation()} className='relative bg-gradient-to-r from-slate-50 to-indigo-200 border shadow-md rounded-lg w-full max-w-sm p-6'>
            <h2 className='text-xl font-bold mb-4 text-center'>Upload the Resume</h2>
            <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title} placeholder='Enter resume title' className='w-full
                        px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required/>
                  <div>
                    <label htmlFor='resume-input' className='block text-sm text-slate-700'>
                      Select Resume File
                      <div className='flex flex-col items-center justify-center gap-2
                                    border group text-slate-400 border-slate-400 border-dashed
                                    rounded-md p-4 py-10 my-4 hover:border-green-500
                                    hover: text-green-700 cursor-pointer transition-colors'>
                        {resume ? (
                          <p className='text-indigo-500'>{resume.name}</p>
                        ): (
                          <>
                          <UploadCloudIcon className='size-14 stroke-1'/>
                          <p>Upload Resume</p>
                          </>
                        )}

                      </div>
                      <input type='file' id="resume-input" accept='.pdf' hidden onChange={(e)=>setResume(e.target.files[0])}/>
                      </label>
                  </div>
                  <button disabled={isLoading} className='flex justify-center items-center w-full py-2 bg-gradient-to-l from-[#ffb3c6] to-[#0077b6] text-white rounded 
                    hover:opacity-70 transition-all disabled:opacity-50 disabled:cursor-not-allowed'>
                                    {isLoading ? (<>
                <LoaderCircleIcon className='animate-spin size-5 text-white'/>
              </>): "Upload Resume"}
                    </button>
                  <XIcon className='absolute top-4 right-4 text-slate-400
                        hover: text-slate-600 cursor-pointer transition-colors' onClick={() =>
            {setShowUploadResume(false); setTitle('') }}/> 
           </div>                  
          </form> )}

        {editResumeId && ( 
              <form onSubmit={editTitle} onClick={()=>setEditResumeId('')} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50
              z-10 flex items-center justify-center'>
              <div onClick={e=>e.stopPropagation()} className='relative bg-gradient-to-r from-slate-50 to-indigo-200 border shadow-md rounded-lg w-full max-w-sm p-6'>
                  <h2 className='text-xl font-bold mb-4 text-center'>Edit Resume Title</h2>
                  <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title} placeholder='Enter resume title' className='w-full
                        px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required/>
                  <button className='w-full py-2 bg-gradient-to-l from-[#ffb3c6] to-[#0077b6] text-white rounded 
                    hover:opacity-70 transition-all'>Update</button>
                  <XIcon className='absolute top-4 right-4 text-slate-400
                        hover: text-slate-600 cursor-pointer transition-colors' onClick={() =>
                  {setEditResumeId(''); setTitle('') }}/> 
                </div>                          
         </form> )}
       

      </div> 
    </div>
  )
}

export default Dashboard