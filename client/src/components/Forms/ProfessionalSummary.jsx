import React from 'react'
import {Sparkles} from "lucide-react"

const ProfessionalSummary = ({data,onChange}) => {
    return (
        <div className='space-y-5'>
                <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                                <h3 className="text-lg font-semibold text-gray-900">Professional Summary</h3>
                                <p className="text-sm text-gray-600">Add a short summary that highlights what makes you a strong candidate</p>
                        </div>
                        <button
                            type='button'
                            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:brightness-110"
                        >
                                <Sparkles className="size-4"/>
                                Ai Enhance
                        </button>
                </div>

                <div> 
                        <textarea
                            value={data || ''}
                            rows={7}
                            onChange={(e)=>onChange(e.target.value)}
                            name="textarea"
                            placeholder='Enter your profile summary'
                            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                        />
                </div>
                <p className="text-xs text-slate-500">
                    Tip: Keep it concise (3-4 sentences) and focus on your most relevant skills and achievements.
                </p>

        </div>
    )
}

export default ProfessionalSummary