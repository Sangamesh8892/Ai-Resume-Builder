import React, { useEffect, useState } from 'react';
import api from '../configs/api';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FileText, Search, CheckCircle, AlertCircle, Lightbulb, Loader2, FileCheck, TrendingUp, Upload, X } from 'lucide-react';
import pdfToText from 'react-pdftotext';
import resumeToText from '../configs/buildResumeText';
import AtsResult from '../components/AtsResult';

const Ats = () => {
	const { token } = useSelector(state => state.auth);
	const [allResumes, setAllResumes] = useState([]);
	const [selectedResumeId, setSelectedResumeId] = useState('');
	const [jobDescription, setJobDescription] = useState('');
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(null);
	// two-part flow
	const [resumeSource, setResumeSource] = useState('saved'); // 'saved' | 'pdf'
	const [resume, setResume] = useState(null);

	const loadAllResumes = async () => {
		try {
			const { data } = await api.get('/api/users/resumes', {
				headers: { Authorization: token }
			});
			setAllResumes(data.resumes || []);
		} catch (error) {
			toast.error(error?.response?.data?.message || error.message);
		}
	};

	useEffect(() => {
		if (token) loadAllResumes();
	}, [token]);

	const getScore = () => {
		const raw = result?.score ;
		const n = Number(raw);
		if (!Number.isFinite(n)) return null;
		return Math.max(0, Math.min(100, n));
	};

	const handleAnalyze = async (e) => {
		e.preventDefault();

		if (!jobDescription.trim()) return toast.error('Please enter a job description');

		if (resumeSource === 'saved' && !selectedResumeId) {
			return toast.error('Please select a resume');
		}
		if (resumeSource === 'pdf' && !resume) {
			return toast.error('Please upload a PDF resume');
		}

		setLoading(true);
		setResult(null);

		try {
			if (resumeSource === 'saved') {

                const resumeData=allResumes.find(resume=>resume._id===selectedResumeId);
                if(!resumeData){
                    toast.error("Resume is empty")
                    return;
                }
                const resumeText=resumeToText(resumeData);

				const { data } = await api.post(
					'/api/ai/analyze-resume',
					{ resumeText, jobDescription },
					{ headers: { Authorization: token } }
				);
				setResult(data);
			} else {
				const resumeText= await pdfToText(resume);

				const { data } = await api.post('/api/ai/analyze-resume', {resumeText, jobDescription}, {
					headers: {
						Authorization: token,
					}
				});
				setResult(data);
			}

			toast.success('Analysis complete!');
		} catch (error) {
			toast.error(error?.response?.data?.message || error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				<div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
					{/* Header */}
					<div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-10 text-center">
						<h1 className="text-4xl font-bold text-white mb-3">
							ATS Resume Checker
						</h1>
						<p className="text-blue-100 text-lg">
							Check how well your resume matches a job description
						</p>
					</div>

					{/* Form */}
					<form onSubmit={handleAnalyze} className="p-8 space-y-6 bg-white">
						{/* source toggle */}
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
							<div className="text-sm font-semibold text-gray-700">Resume source</div>
							<div className="inline-flex rounded-xl border border-gray-200 bg-gray-50 p-1">
								<button
									type="button"
									onClick={() => {
										setResumeSource('saved');
										setResume(null);
									}}
									className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
										resumeSource === 'saved'
											? 'bg-white text-blue-700 shadow-sm'
											: 'text-gray-600 hover:text-gray-800'
									}`}
								>
									Select saved
								</button>
								<button
									type="button"
									onClick={() => {
										setResumeSource('pdf');
										setSelectedResumeId('');
									}}
									className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
										resumeSource === 'pdf'
											? 'bg-white text-blue-700 shadow-sm'
											: 'text-gray-600 hover:text-gray-800'
									}`}
								>
									Upload PDF
								</button>
							</div>
						</div>

						{/* Saved resume selection */}
						{resumeSource === 'saved' && (
							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
									<FileText className="w-4 h-4 text-blue-600" />
									Select Resume
								</label>

								{allResumes.length === 0 ? (
									<div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500">
										<FileText className="w-12 h-12 mx-auto mb-2 text-gray-400" />
										<p className="font-medium">No resumes found.</p>
										<p className="text-sm mt-1">Create one in the Resume Builder first.</p>
									</div>
								) : (
									<select
										value={selectedResumeId}
										onChange={(e) => setSelectedResumeId(e.target.value)}
										className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none hover:border-blue-300 bg-white"
										required
									>
										<option value="">-- Choose a resume --</option>
										{allResumes.map((resume) => (
											<option key={resume._id || resume.id} value={resume._id || resume.id}>
												{resume.title || 'Untitled Resume'}
											</option>
										))}
									</select>
								)}
							</div>
						)}

						{/* PDF upload */}
						{resumeSource === 'pdf' && (
							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
									<Upload className="w-4 h-4 text-blue-600" />
									Upload PDF Resume
								</label>

								<div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-5">
									<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
										<input
											type="file"
											id="resume-input"
											accept="application/pdf,.pdf"
											hidden
											onChange={(e) => setResume(e.target.files?.[0] || null)}
										/>

										<label
											htmlFor="resume-input"
											className="inline-flex items-center justify-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 cursor-pointer"
										>
											<Upload className="w-4 h-4" />
											Choose PDF
										</label>

										{resume && (
											<button
												type="button"
												onClick={() => setResume(null)}
												className="inline-flex items-center justify-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
											>
												<X className="w-4 h-4" />
												Clear
											</button>
										)}
									</div>

									{resume ? (
										<div className="mt-4 text-sm text-gray-700">
											<span className="font-semibold">Selected:</span> {resume.name}
										</div>
									) : (
										<div className="mt-4 text-xs text-gray-500">PDF only.</div>
									)}
								</div>
							</div>
						)}

						{/* Job Description */}
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
								<Search className="w-4 h-4 text-blue-600" />
								Job Description
							</label>
							<textarea
								value={jobDescription}
								onChange={(e) => setJobDescription(e.target.value)}
								placeholder="Paste the job description here..."
								className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none resize-y min-h-[200px] hover:border-blue-300 bg-white"
								rows={10}
							/>
						</div>

						<button
							type="submit"
							disabled={
								loading ||
								(resumeSource === 'saved' && allResumes.length === 0) ||
								(resumeSource === 'pdf' && !resume)
							}
							className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition duration-200 flex items-center justify-center gap-2 ${
								loading
									? 'bg-gray-400 cursor-not-allowed'
									: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl'
							}`}
						>
							{loading ? (
								<>
									<Loader2 className="w-5 h-5 animate-spin" />
									Analyzing...
								</>
							) : (
								<>
									<Search className="w-5 h-5" />
									Analyze Match
								</>
							)}
						</button>
					</form>

					{/* Results */}
					{result &&  <AtsResult result={result} getScore={getScore}/>}
				</div>
			</div>
		</div>
	);
};

export default Ats;
