import { Code2, Sparkles } from "lucide-react";

export default function CodingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-20 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-100 dark:border-blue-800">
          <Code2 className="w-12 h-12 text-blue-600 dark:text-blue-400" />
        </div>
        
        <h1 className="text-5xl font-extrabold tracking-tight mb-6">
          Coding <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Arena</span>
        </h1>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-sm mb-8">
          <Sparkles className="w-4 h-4" />
          Coming Soon
        </div>

        <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-10 max-w-xl mx-auto">
          Ace your technical interviews. We are building an embedded code editor with AI-generated LeetCode-style challenges based on the specific company you are interviewing with.
        </p>

        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-sm text-left">
          <h3 className="font-bold text-lg mb-4">What to expect:</h3>
          <ul className="space-y-4 text-gray-600 dark:text-gray-400">
            <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Interactive code execution environment</li>
            <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-blue-500"></div> AI hints when you get stuck</li>
            <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Big Tech company specific question banks</li>
          </ul>
        </div>
        
      </div>
    </div>
  );
}
