import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets';
import ResumePreview from '../components/ResumePreview';
import Loader from '../components/Loader';
import { ArrowLeftIcon, Ghost } from 'lucide-react';

const Preview = () => {

  const {resumeId}=useParams();
  const [resumeData,setResumeData]=React.useState(null);
  const [isLoading,setIsLoading]=React.useState(true)

  const loadResume=async ()=>{

    await setResumeData(dummyResumeData.find(resume=>resume._id == resumeId || null));
    setIsLoading(false)
  }


  useEffect(()=>{
    loadResume()
  },[])

  return resumeData ? (
    <div className='bg-slate-100'>
      <div className='max-w-3xl mx-auto py-10'>
        <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} className="py-4 bg-white"/>

      </div>
    </div>
  ) : (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50">
          <div className="flex flex-col items-center space-y-6 text-center">
            <Ghost className="h-24 w-24 text-slate-300" strokeWidth={1.5} />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">
                Resume not found
              </h2>
              <p className="text-sm text-slate-500">
                The resume you're looking for doesn't exist or has been removed.
              </p>
            </div>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
            >
              <ArrowLeftIcon className="size-4" />
              Go To Home Page
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Preview