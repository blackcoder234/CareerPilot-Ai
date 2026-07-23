"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Briefcase, Code, FileText, Target, TrendingUp, Trophy, ArrowRight, Sparkles, Zap, Star } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading" || !session) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[#0B0F19]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F19] text-gray-900 dark:text-gray-100 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
        
        {/* Animated Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 border border-white/10 shadow-2xl p-8 sm:p-12">
          {/* Decorative background blobs */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-purple-500/30 blur-3xl mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-blue-500/30 blur-3xl mix-blend-screen animate-pulse" style={{animationDelay: '1s'}}></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-indigo-200 text-sm font-medium backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-purple-400" />
                AI-Powered Career Hub
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                Welcome back, {session.user?.name?.split(' ')[0] || 'User'}
              </h1>
              <p className="text-indigo-200 text-lg max-w-xl">
                Your next big career move starts here. Analyze your resume, practice interviews, and level up your skills.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="flex-1 min-w-[140px] px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg">
                <Trophy className="w-8 h-8 text-yellow-400 mb-2 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                <span className="text-2xl font-bold">1,250</span>
                <span className="text-xs text-indigo-200 font-medium uppercase tracking-wider mt-1">Total XP</span>
              </div>
              <div className="flex-1 min-w-[140px] px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg">
                <Star className="w-8 h-8 text-emerald-400 mb-2 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                <span className="text-2xl font-bold">Level 3</span>
                <span className="text-xs text-indigo-200 font-medium uppercase tracking-wider mt-1">Current Rank</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {/* Main Actions Column */}
          <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <BentoCard 
              href="/resume"
              title="Resume Analyzer"
              description="Drop your PDF to get instant, AI-driven ATS scoring and tailored improvements."
              icon={<FileText className="w-8 h-8" />}
              gradient="from-blue-600/20 to-indigo-600/20"
              iconColor="text-blue-500"
              status="Ready"
              statusColor="bg-blue-500/10 text-blue-500 border-blue-500/20"
            />
            <BentoCard 
              href="/interview"
              title="Mock Interviews"
              description="Practice with our AI recruiter. Behavioral and technical rounds available."
              icon={<Target className="w-8 h-8" />}
              gradient="from-purple-600/20 to-pink-600/20"
              iconColor="text-purple-500"
              status="New"
              statusColor="bg-purple-500/10 text-purple-500 border-purple-500/20"
            />
            <BentoCard 
              href="/coding"
              title="Coding Arena"
              description="Sharpen your algorithms with real-time AI code reviews."
              icon={<Code className="w-8 h-8" />}
              gradient="from-emerald-600/20 to-teal-600/20"
              iconColor="text-emerald-500"
              status="Coming Soon"
              statusColor="bg-gray-500/10 text-gray-500 border-gray-500/20"
            />
            <BentoCard 
              href="/jobs"
              title="Smart Job Matches"
              description="Get roles curated specifically for your skillset and experience."
              icon={<Briefcase className="w-8 h-8" />}
              gradient="from-orange-600/20 to-red-600/20"
              iconColor="text-orange-500"
              status="Coming Soon"
              statusColor="bg-gray-500/10 text-gray-500 border-gray-500/20"
            />
          </div>

          {/* Side Column: Profile & Activity */}
          <div className="space-y-6">
            
            {/* Profile Strength Widget */}
            <div className="bg-white dark:bg-[#131B2C] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Profile Strength</h3>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full border border-green-200 dark:border-green-800/50">
                  Intermediate
                </span>
              </div>
              
              <div className="mb-6 relative">
                <div className="overflow-hidden h-3 mb-2 text-xs flex rounded-full bg-gray-100 dark:bg-gray-800">
                  <div style={{ width: "65%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full relative">
                    <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/20 animate-pulse rounded-full"></div>
                  </div>
                </div>
                <div className="text-right text-sm font-semibold text-gray-500 dark:text-gray-400">65% Complete</div>
              </div>

              <div className="space-y-4">
                <ChecklistItem text="Create account" completed={true} />
                <ChecklistItem text="Upload your first resume" completed={true} />
                <ChecklistItem text="Complete profile details" completed={false} href="/profile" />
                <ChecklistItem text="Take a mock interview" completed={false} />
              </div>
            </div>

            {/* Quick Activity Widget */}
            <div className="bg-white dark:bg-[#131B2C] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center text-center min-h-[200px]">
              <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4 border border-gray-100 dark:border-gray-700">
                <Zap className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">No recent activity</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-[200px]">Start by analyzing your resume or filling out your profile.</p>
              <Link href="/resume" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1 group">
                Go to Analyzer <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function BentoCard({ title, description, icon, gradient, iconColor, status, statusColor, href }: any) {
  return (
    <Link href={href} className="group relative block overflow-hidden rounded-3xl bg-white dark:bg-[#131B2C] border border-gray-200 dark:border-gray-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Background Gradient Blob */}
      <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      <div className="relative p-8 h-full flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 ${iconColor} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm`}>
            {icon}
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusColor}`}>
            {status}
          </span>
        </div>
        
        <h3 className="font-extrabold text-xl mb-2 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
          {description}
        </p>
        
        <div className="mt-6 flex items-center gap-2 text-sm font-bold text-gray-400 group-hover:text-indigo-500 transition-colors">
          Explore feature <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
}

function ChecklistItem({ text, completed, href }: { text: string, completed: boolean, href?: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center border-2 transition-colors ${completed ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300 dark:border-gray-600'}`}>
        {completed && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
      </div>
      <div className={`text-sm transition-colors ${completed ? 'text-gray-400 dark:text-gray-500 line-through decoration-gray-300 dark:decoration-gray-600' : 'text-gray-700 dark:text-gray-200 font-medium'}`}>
        {href && !completed ? (
          <Link href={href} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{text}</Link>
        ) : (
          text
        )}
      </div>
    </div>
  );
}
