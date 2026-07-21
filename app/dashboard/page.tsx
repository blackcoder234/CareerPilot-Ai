"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {session.user?.name}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Here is an overview of your career progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="font-semibold text-lg mb-2">Resume Score</h3>
          <div className="text-4xl font-bold text-blue-600">--</div>
          <p className="text-sm text-gray-500 mt-2">Upload a resume to get started</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="font-semibold text-lg mb-2">Interview Performance</h3>
          <div className="text-4xl font-bold text-emerald-600">--</div>
          <p className="text-sm text-gray-500 mt-2">No interviews taken yet</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="font-semibold text-lg mb-2">Overall Progress</h3>
          <div className="text-4xl font-bold text-purple-600">--</div>
          <p className="text-sm text-gray-500 mt-2">Complete tasks to level up</p>
        </div>
      </div>
    </div>
  );
}
