import { Bot, Rocket, Target, Users } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl font-extrabold tracking-tight mb-6">
            Building the Future of <span className="text-blue-600 dark:text-blue-500">Career Advancement</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            CareerPilot AI is on a mission to democratize career coaching. We believe everyone deserves personalized, expert guidance to land their dream job, powered by state-of-the-art Artificial Intelligence.
          </p>
        </div>

        {/* Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            { icon: Rocket, title: "Accelerate", desc: "Fast-track your job search with AI-optimized resumes and instant feedback." },
            { icon: Target, title: "Precision", desc: "Target exactly the roles you want with tailored interview preparation." },
            { icon: Users, title: "Community", desc: "Join thousands of professionals upgrading their careers with AI." },
            { icon: Bot, title: "Intelligence", desc: "Powered by the latest LLMs to give you human-level career advice 24/7." }
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row items-center">
          <div className="p-12 md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              <p>
                The job market is changing faster than ever. Traditional career coaching is expensive and inaccessible to most people, leaving talented professionals struggling to navigate ATS systems and complex interview processes.
              </p>
              <p>
                We built CareerPilot AI to solve this. By combining cutting-edge AI models with deep industry expertise, we created a platform that gives you an unfair advantage in the hiring market.
              </p>
            </div>
          </div>
          <div className="md:w-1/2 w-full h-full min-h-[400px] relative bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-12">
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
             <div className="relative z-10 w-48 h-48 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl border border-white/20">
               <Image src="/logo.png" alt="Logo" width={100} height={100} className="drop-shadow-2xl" />
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
