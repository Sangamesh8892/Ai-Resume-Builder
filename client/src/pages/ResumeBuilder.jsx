import React, { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/assets";
import { data, Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  Eye,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkle,
  User,
} from "lucide-react";
import PersonalInfoForm from "../components/Forms/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummary from "../components/Forms/ProfessionalSummary";
import ExperienceForm from "../components/Forms/ExperienceForm";
import EducationForm from "../components/Forms/EducationForm";
import ProjectsForm from "../components/Forms/ProjectsForm";
import SkillsForm from "../components/Forms/SkillsForm";

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: "false",
  });

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find((resume) => resume._id == resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkle },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    loadExistingResume();
  }, []);

  const changeResumeVisbility= async ()=>{
    await setResumeData({...resumeData,public:!resumeData.public})
  }

  const handleShare=()=>{
    const frontendUrl=window.location.href.split('/app/')[0]
    const resumeUrl=frontendUrl+'/view/'+resumeId

    if(navigator.share){
      navigator.share({url:resumeUrl,text:"My Resume"})
    }else{
      alert("Share Not supported on this browser")
    }
  }

  const downloadResume=()=>{
    window.print();
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 hover:-translate-y-1 transition-all "
        >
          <ArrowLeftIcon /> Back to dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* left side- Forms */}
          <div className="relative md:col-span-5 rounded-lg overflow-hidden">
            <div
              className="bg-white rounded-lg shadow-sm border border-gray-200
              p-6 pt-1"
            >
              {/* progress bar using active session index */}
              <hr className="absolute top-0 left-0 right-0 border-2 boder-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r
                                  from-indigo-200 to-rose-400 border-none transition-all duration-2000"
                style={{
                  width: `${
                    (activeSectionIndex * 100) / (sections.length - 1)
                  }%`,
                }}
              />

              {/* Section Navigation */}
              <div className="flex justify-between items-center mt-5 mb-6 border-b border-gray-300 py-1">
                
                <div className="flex justify-between items-center py-1 gap-2">
                  
                  <TemplateSelector selectedTemplate={resumeData.template} onChange={(template)=>setResumeData(prev=>({...prev,template}))} />
                  <ColorPicker selectedColor={resumeData.accent_color} onChange={(color)=>setResumeData(prev=>({...prev,accent_color:color}))} /> 
                </div>               
                <div className={`flex items-center ml-25 ${activeSectionIndex ===0 && 'ml-45'} `}>
                  {activeSectionIndex !== 0 && (
                    <button
                      className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                      disabled={activeSectionIndex === 0}
                      onClick={() =>
                        setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                      }
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </button>
                  )}
                  <button
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 
                    hover:bg-gray-50 transition-all mr-50 ${
                      activeSectionIndex === sections.length - 1 && "opacity-50"
                    }`}
                    disabled={activeSectionIndex === sections.length - 1}
                    onClick={() =>
                      setActiveSectionIndex((prev) =>
                        Math.min(prev + 1, sections.length - 1)
                      )
                    }
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
                <div></div>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                {activeSection.id == "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {activeSection.id == "summary" && (
                  <ProfessionalSummary
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}

                {activeSection.id == "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: data,
                      }))
                    }
                  />
                )}

                {activeSection.id == "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        education: data,
                      }))
                    }
                  />
                )}
                
                {activeSection.id == "projects" && 
                <ProjectsForm data={resumeData.project}
                onChange={(data)=>setResumeData(prev=>({...prev,project:data}))}
                />
                }

                {activeSection.id == "skills" && 
                <SkillsForm
                data={resumeData.skills}
                onChange={(data)=>setResumeData(prev=>({...prev,skills:data}))}
                />
                  }

                  <button
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Save Changes
                  </button>
              </div>
            </div>
          </div>

          {/* Rignt side- Preview */}
          <div className="md:col-span-7 max-lg:mt-6">
            {/* Fucntionality Buttons */}
                <div className="relative ">
                  <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                    {resumeData.public && (
                      <button
                        onClick={handleShare}
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-600 shadow-sm transition hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2"
                      >
                        <Share2Icon className="size-4" />
                        Share
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={changeResumeVisbility}
                      className={`inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 `+(resumeData.public 
      ? "bg-rose-100 hover:bg-rose-200" 
      : "bg-green-100 hover:bg-green-200")
  }
                    >
                      {resumeData.public ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4"/>}
                      {resumeData.public ? "Public" : "Private"}
                    </button>

                    <button
                      onClick={downloadResume}
                      type="button"
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-purple-100 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-purple-200 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
                    >
                      <DownloadIcon className="size-4" />
                      Download
                    </button>
                  </div>
                </div>
                {/* Resume Preview */}
                <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
