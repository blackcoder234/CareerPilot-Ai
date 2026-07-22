"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { UploadCloud, FileText, CheckCircle, AlertCircle, Loader2, Sparkles } from "lucide-react";
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

  if (status === "loading" || !session) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">AI Resume Analyzer</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Upload your resume and get instant, actionable feedback based on your career profile.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Upload Area */}
        <div className="flex flex-col h-full space-y-6">
          <div 
            className="flex-1 min-h-[300px] border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-3xl bg-gray-50 dark:bg-gray-900/50 flex flex-col items-center justify-center p-8 transition-colors hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              accept=".pdf"
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
              <UploadCloud className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Upload your Resume</h3>
            <p className="text-gray-500 text-sm mb-6 text-center max-w-xs">
              Drag and drop your PDF resume here, or click to browse files.
            </p>
            {file && (
              <div className="flex items-center gap-2 text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full border border-green-200 dark:border-green-900/50">
                <CheckCircle className="w-4 h-4" />
                {file.name}
              </div>
            )}
          </div>

          <button 
            onClick={analyzeResume}
            disabled={!file || loading}
            className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-lg disabled:opacity-50 hover:scale-[1.02] transition-transform flex justify-center items-center gap-2 shadow-lg"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <FileText className="w-6 h-6" />}
            {loading ? "Analyzing Document..." : "Analyze Resume"}
          </button>


        </div>

        {/* Right Column: AI Feedback Area */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-[500px]">
          <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <h3 className="font-bold text-lg">AI Feedback</h3>
            {loading && <span className="flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full animate-pulse"><Loader2 className="w-3 h-3 animate-spin"/> Processing</span>}
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 prose prose-blue dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-a:text-blue-600">
            {!feedback && !loading ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 pt-20">
                <FileText className="w-16 h-16 opacity-20" />
                <p>Upload a resume and click analyze to see feedback here.</p>
              </div>
            ) : (
              <div className="whitespace-pre-wrap font-sans text-base leading-relaxed">
                {feedback}
              </div>
            )}
          </div>
          
          {analysisComplete && (
            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 border-t border-blue-100 dark:border-blue-900/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-full text-white">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-100 text-sm">Update Profile?</h4>
                  <p className="text-xs text-blue-700 dark:text-blue-300">We can auto-fill your Experience, Education, and Skills using AI.</p>
                </div>
              </div>
              <button 
                onClick={handleAutoFillProfile}
                disabled={extracting}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-semibold text-sm transition-colors flex items-center gap-2 shadow-sm"
              >
                {extracting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {extracting ? "Extracting..." : "Auto-Fill Profile"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
