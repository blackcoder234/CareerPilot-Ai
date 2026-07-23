"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Save, Plus, Trash2, User, Briefcase, GraduationCap, Sparkles, Loader2, Target } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [targetRole, setTargetRole] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState<string[]>([]);
  const [education, setEducation] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetch("/api/profile")
        .then(res => res.json())
        .then(data => {
          if (data.profile) {
            setTargetRole(data.profile.targetRole || "");
            setSkills(data.profile.skills ? data.profile.skills.join(", ") : "");
            setExperience(data.profile.experience || []);
            setEducation(data.profile.education || []);
          }
          setIsFetching(false);
        })
        .catch(err => {
          toast.error("Failed to fetch profile: " + err.message);
          setIsFetching(false);
        });
    }
  }, [session]);

  if (status === "loading" || isFetching) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[#0B0F19]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!session) return null;

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          targetRole, 
          skills,
          experience: experience.filter(e => e.trim() !== ""),
          education: education.filter(e => e.trim() !== "")
        }),
      });
      if (res.ok) {
        toast.success("Profile saved successfully!");
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to save profile.");
      }
    } catch (e: any) {
      toast.error(e.message || "An error occurred.");
    }
    setLoading(false);
  };

  const addField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, ""]);
  };

  const updateField = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter(prev => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
  };

  const removeField = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F19] text-gray-900 dark:text-gray-100 pb-24">
      
      {/* Header Section */}
      <div className="relative overflow-hidden bg-white dark:bg-[#131B2C] border-b border-gray-200 dark:border-gray-800 pt-16 pb-12 shadow-sm">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Your Profile</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Manage your career identity to get perfectly tailored AI feedback and job matches.
            </p>
          </div>
          <button 
            onClick={handleSave}
            disabled={loading}
            className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        
        {/* Personal Details */}
        <div className="bg-white dark:bg-[#131B2C] rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 sm:p-10 relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <User className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">Personal Details</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
              <input
                type="text"
                disabled
                value={session.user?.name || ""}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-500 cursor-not-allowed opacity-80"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
              <input
                type="email"
                disabled
                value={session.user?.email || ""}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-500 cursor-not-allowed opacity-80"
              />
            </div>
          </div>
        </div>

        {/* Career Identity */}
        <div className="bg-white dark:bg-[#131B2C] rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 sm:p-10 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">Career Identity</h2>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Target Job Role</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full px-5 py-4 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Top Skills (comma separated)</label>
                <span className="text-xs text-gray-400">Used for AI Matching</span>
              </div>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. React, Node.js, Python, System Design"
                className="w-full px-5 py-4 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all shadow-sm"
              />
              
              {/* Animated Skill Tags Display */}
              {skills.trim() && (
                <div className="flex flex-wrap gap-2 pt-3">
                  {skills.split(',').map(s => s.trim()).filter(s => s).map((skill, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-xl border border-purple-200 dark:border-purple-800/50 shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="bg-white dark:bg-[#131B2C] rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 sm:p-10 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Briefcase className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Experience</h2>
            </div>
            <button 
              onClick={() => addField(setExperience)} 
              className="flex items-center justify-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200 bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 px-4 py-2.5 rounded-xl transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Role
            </button>
          </div>
          
          <div className="space-y-6">
            {experience.length === 0 && (
              <div className="text-center py-10 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50 dark:bg-gray-800/20">
                <p className="text-gray-500 font-medium">No experience added yet. The AI can auto-fill this from your resume.</p>
              </div>
            )}
            {experience.map((exp, index) => (
              <div key={index} className="flex gap-4 group/item animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="flex-1">
                  <textarea
                    value={exp}
                    onChange={(e) => updateField(setExperience, index, e.target.value)}
                    placeholder="e.g. Software Engineer at Google (2020-Present) - Developed core features..."
                    className="w-full px-5 py-4 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none min-h-[100px] resize-y shadow-sm transition-shadow"
                  />
                </div>
                <button 
                  onClick={() => removeField(setExperience, index)} 
                  className="mt-2 p-3 h-12 w-12 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all border border-transparent hover:border-red-100 dark:hover:border-red-800"
                  title="Remove"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="bg-white dark:bg-[#131B2C] rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 sm:p-10 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Education</h2>
            </div>
            <button 
              onClick={() => addField(setEducation)} 
              className="flex items-center justify-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 px-4 py-2.5 rounded-xl transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Education
            </button>
          </div>
          
          <div className="space-y-4">
            {education.length === 0 && (
              <div className="text-center py-10 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50 dark:bg-gray-800/20">
                <p className="text-gray-500 font-medium">No education added yet. The AI can auto-fill this from your resume.</p>
              </div>
            )}
            {education.map((edu, index) => (
              <div key={index} className="flex items-center gap-4 group/item animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="flex-1">
                  <input
                    type="text"
                    value={edu}
                    onChange={(e) => updateField(setEducation, index, e.target.value)}
                    placeholder="e.g. B.S. Computer Science, Stanford University (2019)"
                    className="w-full px-5 py-4 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none shadow-sm transition-shadow"
                  />
                </div>
                <button 
                  onClick={() => removeField(setEducation, index)} 
                  className="p-3 h-12 w-12 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all border border-transparent hover:border-red-100 dark:hover:border-red-800"
                  title="Remove"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
