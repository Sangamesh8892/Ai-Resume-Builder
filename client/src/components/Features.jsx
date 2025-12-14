import React from "react";
import {Zap} from "lucide-react"
import Title from "./Title";


const Features = () => {
    const [isHover, setIsHover] = React.useState(false);

    return (
        <div id="features" className="flex flex-col items-center my-10 scroll-mt-12">
             <div className="flex items-center gap-2 text-sm text-cyan-800 bg-indigo-600/10 border  rounded-full px-6 py-1">
             <Zap width={14} />
            <span>Powerful Features</span>
        </div>

          <Title title="Build your resume with confidence" description="Our AI-powered platform provides everything you need to create, optimize, and download professional resumes that get you noticed by recruiters" />


            <div className="flex flex-col md:flex-row items-center justify-center">
                <img className="max-w-2xl w-full xl:-ml-32" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png" alt="" />
                <div className="px-4 md:px-0" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                    <div className={"flex items-center justify-center gap-6 max-w-md group cursor-pointer"}>
                        <a href="/app/ats">
                        <div className={`p-6 group-hover:bg-violet-100 border border-transparent group-hover:border-violet-300  flex gap-4 rounded-xl transition-colors ${!isHover ? 'border-violet-300 bg-violet-100' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 stroke-violet-600"><path d="M9 11a3 3 0 1 0 6 0 3 3 0 0 0-6 0"/><path d="M12 2a9 9 0 0 1 9 9c0 3.74-2.69 9-9 9s-9-5.26-9-9a9 9 0 0 1 9-9"/><path d="M12 11v.01"/></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">ATS Score Check</h3>
                                <p className="text-sm text-slate-600 max-w-xs">Analyze your resume against ATS systems and get instant optimization suggestions to pass recruiter filters.</p>
                            </div>
                        </div>
                        </a>
                    </div>
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                        <div className="p-6 group-hover:bg-green-100 border border-transparent group-hover:border-green-300 flex gap-4 rounded-xl transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 stroke-green-600"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">Live Preview</h3>
                                <p className="text-sm text-slate-600 max-w-xs">See your changes in real-time as you edit. What you see is exactly what you download.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                        <div className="p-6 group-hover:bg-orange-100 border border-transparent group-hover:border-orange-300 flex gap-4 rounded-xl transition-colors">
                            <svg className="size-6 stroke-orange-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">AI-Powered Suggestions</h3>
                                <p className="text-sm text-slate-600 max-w-xs">Get intelligent recommendations to improve your content, formatting, and keyword optimization.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                        <div className="p-6 group-hover:bg-blue-100 border border-transparent group-hover:border-blue-300 flex gap-4 rounded-xl transition-colors">
                            <svg className="size-6 stroke-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">No Payment Walls</h3>
                                <p className="text-sm text-slate-600 max-w-xs">Download your professional resume instantly. No hidden fees, no credit card required at checkout.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
        </div>
    );
};

export default Features;