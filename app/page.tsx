import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bot, Code, FileText, Target, Star, PlayCircle, UploadCloud, TrendingUp } from "lucide-react";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white overflow-hidden selection:bg-blue-500/30 transition-colors duration-300">
      
      {/* Background Animated Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-300/40 dark:bg-blue-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-violet-300/40 dark:bg-violet-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-emerald-300/30 dark:bg-emerald-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob" style={{ animationDelay: '4s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/50 dark:bg-white/5 border border-blue-100 dark:border-white/10 text-blue-600 dark:text-blue-400 font-medium text-sm mb-8 backdrop-blur-sm shadow-sm dark:shadow-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              CareerPilot AI 2.0 is live
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-gray-900 dark:text-white">
              Your dream job, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-600 dark:from-blue-500 dark:via-violet-500 dark:to-emerald-500">
                engineered by AI.
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-xl">
              Stop guessing what recruiters want. Upload your resume, practice technical interviews, and get hyper-personalized, data-driven feedback instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/login" 
                className="group flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-xl dark:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:-translate-y-1"
              >
                Start for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="#how-it-works" 
                className="flex items-center justify-center gap-2 bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/80 dark:hover:bg-white/10 transition-all backdrop-blur-sm shadow-sm dark:shadow-none"
              >
                <PlayCircle className="w-5 h-5" />
                See how it works
              </Link>
            </div>
            
            <div className="mt-10 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-white dark:border-[#0a0a0a] bg-gradient-to-br from-blue-${400+(i*100)} to-violet-${400+(i*100)} flex items-center justify-center text-xs font-bold text-white shadow-sm`}>
                    {String.fromCharCode(64+i)}
                  </div>
                ))}
              </div>
              <div>Joined by <span className="text-gray-900 dark:text-white font-semibold">10,000+</span> job seekers</div>
            </div>
          </div>

          <div className="relative lg:h-[600px] flex items-center justify-center animate-float">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-violet-500/20 rounded-3xl transform rotate-3 blur-2xl"></div>
            <div className="relative rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-xl shadow-2xl overflow-hidden aspect-square md:aspect-video lg:aspect-square w-full max-w-lg mx-auto transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="absolute top-0 left-0 w-full h-8 bg-gray-100/50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="mt-8 p-1 w-full h-[calc(100%-2rem)]">
                <Image 
                  src="/images/hero.png" 
                  alt="CareerPilot AI Dashboard" 
                  width={800} 
                  height={800} 
                  className="w-full h-full object-cover rounded-xl opacity-100 dark:opacity-90 shadow-inner"
                  priority
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Partners / Social Proof */}
      <section className="border-y border-gray-200 dark:border-white/5 bg-gray-100/50 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-60 dark:opacity-50 grayscale transition-opacity hover:grayscale-0 hover:opacity-100">
          <p className="text-sm font-semibold uppercase tracking-widest text-center md:text-left text-gray-500 dark:text-gray-400">Trusted by candidates at</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 font-bold text-xl text-gray-700 dark:text-gray-300">
            <span>GOOGLE</span>
            <span>META</span>
            <span>AMAZON</span>
            <span>NETFLIX</span>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">From upload to offer in 3 steps</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">Our AI analyzes thousands of successful tech hires to give you the exact feedback you need to stand out.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <StepCard 
            number="01"
            icon={<UploadCloud className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
            title="Upload Resume"
            description="Drop your PDF resume. Our AI instantly parses your experience and identifies critical gaps compared to your target role."
          />
          <StepCard 
            number="02"
            icon={<Bot className="w-8 h-8 text-violet-600 dark:text-violet-400" />}
            title="AI Optimization"
            description="Get line-by-line feedback, ATS scoring, and bullet point rewrites to guarantee you pass the resume screen."
          />
          <StepCard 
            number="03"
            icon={<TrendingUp className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />}
            title="Land Interviews"
            description="Apply with confidence. Users report a 3x increase in interview callbacks after implementing our AI feedback."
          />
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Everything you need to succeed</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 md:h-[600px]">
          
          <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-white dark:bg-gradient-to-br dark:from-blue-900/40 dark:to-black border border-gray-200 dark:border-white/10 p-8 relative overflow-hidden group shadow-lg dark:shadow-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 dark:bg-blue-500/20 rounded-full filter blur-[80px] group-hover:bg-blue-200/50 dark:group-hover:bg-blue-500/40 transition-colors duration-700"></div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 dark:border-blue-500/30">
                <FileText className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Deep Resume Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md">
                Our Gemini-powered engine doesn't just check for keywords. It understands context, measures impact, and suggests powerful action verbs tailored perfectly to the job you want.
              </p>
              
              <div className="mt-auto bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl p-4 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">AI Suggestion</span>
                </div>
                <p className="text-gray-900 dark:text-white text-sm font-mono leading-relaxed">
                  <span className="text-red-500 dark:text-red-400 line-through mr-2">"Worked on the backend database to make it faster"</span>
                  <br/>
                  <span className="text-green-600 dark:text-green-400 font-semibold">"Engineered PostgreSQL indexing strategies, reducing query latency by 45% for 10k+ daily users"</span>
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white dark:bg-gradient-to-br dark:from-violet-900/40 dark:to-black border border-gray-200 dark:border-white/10 p-8 relative overflow-hidden group shadow-md dark:shadow-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-100/50 dark:bg-violet-500/20 rounded-full filter blur-[50px]"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-violet-50 dark:bg-violet-500/20 rounded-xl flex items-center justify-center mb-4 border border-violet-100 dark:border-violet-500/30">
                <Target className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Mock Interviews</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Behavioral and technical interviews with our AI. Get scored on confidence, STAR method, and clarity.
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-white dark:bg-gradient-to-br dark:from-emerald-900/40 dark:to-black border border-gray-200 dark:border-white/10 p-8 relative overflow-hidden group shadow-md dark:shadow-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 dark:bg-emerald-500/20 rounded-full filter blur-[50px]"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 border border-emerald-100 dark:border-emerald-500/30">
                <Code className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Coding Arena</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                In-browser IDE with an AI tutor that reviews your Big O notation and code cleanliness in real-time.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden shadow-xl dark:shadow-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/50 dark:bg-blue-600/10 rounded-full filter blur-[100px] pointer-events-none"></div>
          
          <div className="flex justify-center mb-8">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-8 max-w-4xl mx-auto leading-tight text-gray-900 dark:text-white">
            "I spent months getting automated rejection emails. After putting my resume through CareerPilot AI, I landed 4 interviews in two weeks and just signed an offer at a major tech company."
          </h2>
          
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center font-bold text-xl text-white shadow-md">
              S
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900 dark:text-white">Sarah Jenkins</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Software Engineer</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-50 dark:bg-blue-600/10 border-y border-blue-100 dark:border-white/5"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-gray-900 dark:text-white">Ready to level up?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">Join thousands of job seekers who have accelerated their careers with AI.</p>
          <Link 
            href="/login" 
            className="inline-flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black px-10 py-5 rounded-full text-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-xl dark:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:-translate-y-1"
          >
            Create your free account
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Include the beautiful Footer */}
      <Footer />
    </div>
  );
}

function StepCard({ number, icon, title, description }: { number: string, icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="relative p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors group shadow-sm dark:shadow-none">
      <div className="absolute top-8 right-8 text-6xl font-black text-gray-100 dark:text-white/5 group-hover:text-gray-200 dark:group-hover:text-white/10 transition-colors">
        {number}
      </div>
      <div className="mb-8 inline-block p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-md group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white relative z-10">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed relative z-10">{description}</p>
    </div>
  );
}
