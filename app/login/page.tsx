"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GitBranch, Mail } from "lucide-react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Sign in to continue to CareerPilot AI
          </p>
        </div>

        <div className="space-y-4 mt-8">
          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium shadow-sm"
          >
            <Mail className="w-5 h-5 text-red-500" />
            Continue with Google
          </button>
          
          <button
            onClick={() => signIn("github")}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#24292F] hover:bg-[#24292F]/90 text-white rounded-lg transition-colors font-medium shadow-sm"
          >
            <GitBranch className="w-5 h-5" />
            Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
