"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Briefcase, Code, FileText, Target, TrendingUp, Trophy } from "lucide-react";
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
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back, <span className="font-semibold text-gray-900 dark:text-gray-100">{session.user?.name}</span>. Ready to level up?
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-lg flex items-center gap-2 font-medium">
            <Trophy className="w-5 h-5" />
            0 XP
          </div>
          <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg flex items-center gap-2 font-medium">
            <TrendingUp className="w-5 h-5" />
            Level 1
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Quick Actions & Stats */}
        <div className="lg:col-span-2 space-y-8">
          {/* Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <DashboardCard 
              href="/resume"
              title="Resume Analyzer"
              description="Upload your latest resume for AI scoring and feedback."
              icon={<FileText className="w-6 h-6 text-blue-600" />}
              color="bg-blue-50 dark:bg-blue-900/20"
              borderColor="border-blue-100 dark:border-blue-900/50"
              status="Not tested"
            />
            <DashboardCard 
              href="/interview"
              title="Mock Interview"
              description="Practice a behavioral or technical interview."
              icon={<Target className="w-6 h-6 text-violet-600" />}
              color="bg-violet-50 dark:bg-violet-900/20"
              borderColor="border-violet-100 dark:border-violet-900/50"
              status="No data"
            />
            <DashboardCard 
              href="/coding"
              title="Coding Arena"
              description="Solve algorithms and get AI code reviews."
              icon={<Code className="w-6 h-6 text-emerald-600" />}
              color="bg-emerald-50 dark:bg-emerald-900/20"
              borderColor="border-emerald-100 dark:border-emerald-900/50"
              status="0 Solved"
            />
            <DashboardCard 
              href="/jobs"
              title="Job Matches"
              description="AI-curated roles based on your profile and skills."
              icon={<Briefcase className="w-6 h-6 text-orange-600" />}
              color="bg-orange-50 dark:bg-orange-900/20"
              borderColor="border-orange-100 dark:border-orange-900/50"
              status="Coming Soon"
            />
          </div>

          {/* Activity Feed Placeholder */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <TrendingUp className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-700" />
              <p>You haven't completed any activities yet.</p>
              <p className="text-sm">Upload a resume or start an interview to see your progress here.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Completion */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Profile Strength</h3>
            
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 dark:bg-blue-900 dark:text-blue-300">
                    Beginner
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-400">
                    30%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100 dark:bg-gray-800">
                <div style={{ width: "30%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
              </div>
            </div>

            <ul className="space-y-3 mt-6 text-sm">
              <li className="flex items-center gap-3 text-green-600 dark:text-green-400">
                <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">✓</div>
                Create account
              </li>
              <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center"></div>
                <Link href="/profile" className="hover:text-blue-600 hover:underline">Complete profile details</Link>
              </li>
              <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center"></div>
                Upload first resume
              </li>
              <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center"></div>
                Take a mock interview
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

function DashboardCard({ title, description, icon, color, borderColor, status, href }: any) {
  return (
    <Link href={href} className={`block p-6 rounded-2xl border ${borderColor} ${color} hover:shadow-md transition-all group`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white dark:bg-black/50 rounded-xl shadow-sm">
          {icon}
        </div>
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-black/20 px-2 py-1 rounded-md">
          {status}
        </span>
      </div>
      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </Link>
  );
}
