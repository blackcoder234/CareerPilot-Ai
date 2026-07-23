"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { UploadCloud, FileText, CheckCircle, AlertCircle, Loader2, Sparkles, ArrowRight, Zap, Target } from "lucide-react";
import toast from "react-hot-toast";

export default function ResumeAnalyzerPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [feedback, setFeedback] = useState<string>("");
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please upload a valid PDF file.");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setFeedback("");
      setAnalysisComplete(false);
    }
  };

  const analyzeResume = async () => {
    if (!file) return;

    setLoading(true);
    setFeedback("");
    setAnalysisComplete(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Analysis failed");
      }

      if (!response.body) throw new Error("No response stream");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          setFeedback((prev) => prev + chunk);
        }
      }
      setAnalysisComplete(true);
      toast.success("Analysis complete!");
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleAutoFillProfile = async () => {
    if (!file) return;
    setExtracting(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/profile/extract", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Extraction failed");

      const data = await response.json();
      
      // Save it to profile
      const saveRes = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skills: data.profileData.skills.join(", "),
          experience: data.profileData.experience,
          education: data.profileData.education,
        }),
      });

      if (saveRes.ok) {
        toast.success("Profile successfully updated from resume!");
        router.push("/profile");
      } else {
        throw new Error("Failed to save profile");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to auto-fill profile");
    } finally {
      setExtracting(false);
    }
  };

  if (status === "loading" || !session) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[#0B0F19]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F19] text-gray-900 dark:text-gray-100 pb-20">
      
      {/* Premium Header */}
      <div className="relative overflow-hidden bg-white dark:bg-[#131B2C] border-b border-gray-200 dark:border-gray-800 pt-16 pb-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-sm font-bold mb-6">
            <Zap className="w-4 h-4" /> Powered by Gemini Flash
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            AI Resume Analyzer
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Upload your resume to get instant, actionable feedback. We scan for ATS compatibility, keyword optimization, and impactful achievements.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Upload Area (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col h-full space-y-6">
            <div className="bg-white dark:bg-[#131B2C] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden group transition-shadow hover:shadow-lg">
              
              {/* Animated Border Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">1. Upload Document</h3>
                {file && <CheckCircle className="w-6 h-6 text-green-500" />}
              </div>

              <div 
                className={`relative flex-1 min-h-[250px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 transition-all duration-300 cursor-pointer overflow-hidden ${
                  file 
                    ? 'border-indigo-300 dark:border-indigo-700 bg-indigo-50/50 dark:bg-indigo-900/10' 
                    : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  accept=".pdf"
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
                  file ? 'bg-indigo-100 dark:bg-indigo-900/40 scale-110' : 'bg-white dark:bg-gray-800 shadow-sm group-hover:scale-110 group-hover:shadow-md'
                }`}>
                  {file ? (
                    <FileText className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                  ) : (
                    <UploadCloud className="w-10 h-10 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                  )}
                </div>
                
                {file ? (
                  <div className="text-center animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate max-w-[200px]">{file.name}</p>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">Ready to analyze</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">Drag & drop PDF</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[200px]">
                      or click to browse from your computer
                    </p>
                  </div>
                )}
              </div>

              {/* Temporary Test Button for Agent */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const testFile = new File(["dummy content"], "Amarnath Bera - Full Stack Developer Resume.pdf", { type: "application/pdf" });
                    setFile(testFile);
                    setFeedback("");
                    setAnalysisComplete(false);
                  }}
                  className="text-xs text-gray-400 hover:text-indigo-500 underline underline-offset-2 transition-colors"
                >
                  Load Test Resume
                </button>
              </div>
            </div>

            <button 
              onClick={analyzeResume}
              disabled={!file || loading}
              className="relative overflow-hidden w-full py-5 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl group flex justify-center items-center gap-3 bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-200 text-white dark:text-black hover:scale-[1.02]"
            >
              {/* Shine effect on hover */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
              
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Target className="w-6 h-6 group-hover:rotate-12 transition-transform" />}
              {loading ? "Analyzing Document..." : "Analyze Resume"}
            </button>
          </div>

          {/* Right Column: AI Feedback Area (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <div className="bg-white dark:bg-[#131B2C] border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm flex flex-col flex-1 relative overflow-hidden transition-all min-h-[600px]">
              
              <div className="bg-gray-50 dark:bg-[#1A233A] px-8 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-extrabold text-lg">AI Feedback</h3>
                </div>
                {loading && (
                  <span className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-800/50">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></div> Processing...
                  </span>
                )}
              </div>
              
              <div className="p-8 flex-1 overflow-y-auto bg-white dark:bg-[#131B2C] text-gray-800 dark:text-gray-300 relative z-0">
                
                {/* Background Pattern when empty */}
                {!feedback && !loading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 p-8 text-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat opacity-50 dark:opacity-10 mix-blend-multiply dark:mix-blend-screen pointer-events-none">
                  </div>
                )}
                
                {!feedback && !loading ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 space-y-6 relative z-10 animate-in fade-in duration-700">
                    <div className="w-24 h-24 rounded-3xl bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center transform rotate-6">
                      <FileText className="w-10 h-10 text-gray-300 dark:text-gray-600" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xl font-bold text-gray-900 dark:text-white text-center">Awaiting Resume</p>
                      <p className="text-center max-w-sm">Upload a document and hit analyze to generate your personalized action plan.</p>
                    </div>
                  </div>
                ) : (
                  <div className="font-sans text-base leading-relaxed animate-in fade-in duration-300">
                    {loading && !feedback ? (
                      <div className="space-y-4 pt-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full w-3/4 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full w-1/2 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full w-5/6 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full w-2/3 animate-pulse"></div>
                        <div className="h-32 bg-gray-100 dark:bg-gray-800/50 rounded-xl w-full animate-pulse mt-8"></div>
                      </div>
                    ) : (
                      <div className="prose prose-lg prose-indigo dark:prose-invert max-w-none 
                        prose-headings:font-extrabold prose-headings:tracking-tight 
                        prose-h2:text-2xl prose-h2:border-b prose-h2:border-gray-100 dark:prose-h2:border-gray-800 prose-h2:pb-3 prose-h2:mt-8
                        prose-p:text-gray-600 dark:prose-p:text-gray-300
                        prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-li:marker:text-indigo-500
                        prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold
                        whitespace-pre-wrap">
                        {feedback}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {analysisComplete && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 border-t border-indigo-100 dark:border-indigo-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-10">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-3 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-indigo-900 dark:text-indigo-100 text-lg">Auto-Fill Profile</h4>
                      <p className="text-sm text-indigo-700 dark:text-indigo-300 font-medium mt-0.5">We can extract your skills and experience to update your profile automatically.</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleAutoFillProfile}
                    disabled={extracting}
                    className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-[#131B2C] hover:bg-gray-50 dark:hover:bg-gray-800 border border-indigo-200 dark:border-indigo-800 disabled:opacity-50 text-indigo-700 dark:text-indigo-400 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md whitespace-nowrap"
                  >
                    {extracting ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                    {extracting ? "Extracting..." : "Update My Profile"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
