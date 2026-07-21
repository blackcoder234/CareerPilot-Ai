"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GitBranch, Mail, LogIn, UserPlus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCredentialsAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      // Handle Sign In
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        toast.error(res.error);
        setLoading(false);
      } else {
        toast.success("Successfully logged in!");
        // router.push is handled by the useEffect above
      }
    } else {
      // Handle Sign Up
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Registration failed");
        }

        toast.success("Registration successful! Logging you in...");
        
        // Auto sign-in after successful registration
        await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

      } catch (err: any) {
        toast.error(err.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {isLogin
              ? "Sign in to continue to CareerPilot AI"
              : "Sign up to start your career journey"}
          </p>
        </div>

        {/* Custom Auth Form */}
        <form onSubmit={handleCredentialsAuth} className="space-y-4 mt-8">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-sm disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />)}
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or continue with</span>
          <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium shadow-sm"
          >
            <Mail className="w-5 h-5 text-red-500" />
            Google
          </button>
          
          <button
            onClick={() => signIn("github")}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#24292F] hover:bg-[#24292F]/90 text-white rounded-lg transition-colors font-medium shadow-sm"
          >
            <GitBranch className="w-5 h-5" />
            GitHub
          </button>
        </div>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button 
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({ name: "", email: "", password: "" }); // Reset form
            }}
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
