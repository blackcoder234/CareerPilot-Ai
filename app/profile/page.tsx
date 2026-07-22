"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [targetRole, setTargetRole] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState<string[]>([]);
  const [education, setEducation] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

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
        })
        .catch(err => toast.error("Failed to fetch profile: " + err.message));
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Your Profile</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">Manage your career history, goals, and skills.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-10 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              disabled
              value={session.user?.name || ""}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 cursor-not-allowed"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              disabled
              value={session.user?.email || ""}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
          <h3 className="text-2xl font-bold mb-6">Career Identity</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Target Job Role</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Top Skills (comma separated)</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. React, Node.js, Python, Leadership"
                className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Experience</h3>
            <button onClick={() => addField(setExperience)} className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg transition-colors">
              <Plus className="w-4 h-4" /> Add Experience
            </button>
          </div>
          
          <div className="space-y-4">
            {experience.length === 0 && <p className="text-sm text-gray-500 italic">No experience added yet.</p>}
            {experience.map((exp, index) => (
              <div key={index} className="flex items-start gap-3">
                <textarea
                  value={exp}
                  onChange={(e) => updateField(setExperience, index, e.target.value)}
                  placeholder="e.g. Software Engineer at Google (2020-Present) - Developed core features..."
                  className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none min-h-[80px]"
                />
                <button onClick={() => removeField(setExperience, index)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Education</h3>
            <button onClick={() => addField(setEducation)} className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg transition-colors">
              <Plus className="w-4 h-4" /> Add Education
            </button>
          </div>
          
          <div className="space-y-4">
            {education.length === 0 && <p className="text-sm text-gray-500 italic">No education added yet.</p>}
            {education.map((edu, index) => (
              <div key={index} className="flex items-start gap-3">
                <input
                  type="text"
                  value={edu}
                  onChange={(e) => updateField(setEducation, index, e.target.value)}
                  placeholder="e.g. B.S. Computer Science, Stanford University (2019)"
                  className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button onClick={() => removeField(setEducation, index)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex justify-end">
          <button 
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-full transition-colors font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <Save className="w-5 h-5" />
            )}
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
