import Link from "next/link";
import { ArrowRight, Bot, Code, FileText, Target } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium text-sm mb-8 animate-fade-in">
          <Bot className="w-4 h-4" />
          <span>Meet your new AI Career Coach</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl text-gray-900 dark:text-white">
          Accelerate your career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">AI precision</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl leading-relaxed">
          Upload your resume, practice technical interviews, and get personalized feedback to land your dream job faster.
        </p>
        <Link 
          href="/login" 
          className="group flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full text-lg font-medium hover:scale-105 transition-all shadow-lg hover:shadow-xl"
        >
          Get Started for Free
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Everything you need to succeed</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FileText className="w-8 h-8 text-blue-500" />}
              title="Resume Analyzer"
              description="Get instant ATS scoring and actionable feedback to make your resume stand out to recruiters."
            />
            <FeatureCard 
              icon={<Target className="w-8 h-8 text-violet-500" />}
              title="Mock Interviews"
              description="Practice behavioral and technical questions with our AI. Get scored on your delivery and content."
            />
            <FeatureCard 
              icon={<Code className="w-8 h-8 text-emerald-500" />}
              title="Coding Arena"
              description="Solve data structures and algorithms problems with an AI tutor that reviews your code quality."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 hover:shadow-xl hover:border-blue-500/30 transition-all group">
      <div className="mb-6 inline-block p-4 rounded-xl bg-white dark:bg-black shadow-sm group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
