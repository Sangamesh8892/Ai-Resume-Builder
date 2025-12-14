import React from 'react'
import { TrendingUp, FileCheck , CheckCircle,AlertCircle,Lightbulb } from 'lucide-react'

const AtsResult = ({result,getScore}) => {
  return (
    						<div className="border-t-2 border-gray-200 p-8 bg-gray-50">
							<h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
								<TrendingUp className="w-8 h-8 text-blue-600" />
								Analysis Results
							</h2>
							
							{/* Score Display */}
							<div className="bg-white rounded-xl p-8 shadow-md mb-6 text-center border border-gray-200 hover:shadow-lg transition-shadow">
								<div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2 flex items-center justify-center gap-2">
									<FileCheck className="w-4 h-4" />
									ATS Match Score
								</div>
								<div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
									{result.score || '0'}%
								</div>
								{/* Progress Bar */}
								<div className="w-full bg-gray-200 rounded-full h-2 mt-4">
									<div 
										className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-700"
										style={{ width: `${getScore() ?? 0}%` }}
									/>
								</div>
							</div>

							{/* Matched Skills */}
							{result.matchedSkills && result.matchedSkills.length > 0 && (
								<div className="mb-6">
									<h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
										<CheckCircle className="w-6 h-6 text-green-500" />
										Matched Skills
									</h3>
									<div className="flex flex-wrap gap-2">
										{result.matchedSkills.map((skill, idx) => (
											<span
												key={idx}
												className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-200 hover:shadow-md transition-shadow"
											>
												{skill}
											</span>
										))}
									</div>
								</div>
							)}

							{/* Missing Skills */}
							{result.missingSkills && result.missingSkills.length > 0 && (
								<div className="mb-6">
									<h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
										<AlertCircle className="w-6 h-6 text-orange-500" />
										Missing Skills
									</h3>
									<div className="flex flex-wrap gap-2">
										{result.missingSkills.map((skill, idx) => (
											<span
												key={idx}
												className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium border border-orange-200 hover:shadow-md transition-shadow"
											>
												{skill}
											</span>
										))}
									</div>
								</div>
							)}

							{/* Suggestions */}
							{result.suggestions && (
								<div>
									<h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
										<Lightbulb className="w-6 h-6 text-blue-500" />
										Suggestions
									</h3>
									<ul className="bg-white rounded-lg p-6 border-2 border-blue-100 text-gray-700 space-y-2 list-disc list-inside">
                                        {result.suggestions.map((point, idx) => (
                                        <li key={idx}>{point}</li>
                                                        ))}
                                    </ul>

								</div>
							)}
						</div>
  )
}

export default AtsResult