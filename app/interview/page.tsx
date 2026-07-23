"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  MessageCircle,
  Send,
  Sparkles,
  Target,
  Code,
  Shuffle,
  ArrowRight,
  Loader2,
  StopCircle,
  RotateCcw,
  User,
  Bot,
  Zap,
} from "lucide-react";

type InterviewType = "behavioral" | "technical" | "mixed";

export default function InterviewPage() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();

  const [started, setStarted] = useState(false);
  const [interviewType, setInterviewType] = useState<InterviewType>("behavioral");
  const [customRole, setCustomRole] = useState("");
  const [inputText, setInputText] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (authStatus === "unauthenticated") {
      router.push("/login");
    }
  }, [authStatus, router]);

  const transport = useMemo(() => new DefaultChatTransport({
    api: "/api/interview/chat",
    body: {
      interviewType,
      targetRole: customRole || undefined,
    },
  }), [interviewType, customRole]);

  const {
    messages,
    sendMessage,
    status,
    setMessages,
    stop,
  } = useChat({
    transport,
  });

  const isLoading = status === "streaming" || status === "submitted";

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startInterview = async () => {
    setStarted(true);
    setMessages([]);
    // Send the initial message to trigger the AI's first question
    setTimeout(() => {
      sendMessage({
        text: `I'm ready for my ${interviewType} interview. Let's begin.`,
      });
    }, 300);
  };

  const handleSendMessage = async () => {
    const text = inputText.trim();
    if (!text || isLoading) return;
    setInputText("");
    await sendMessage({ text });
  };

  const resetInterview = () => {
    setStarted(false);
    setMessages([]);
    setInputText("");
  };

  // Check if interview is complete (AI sent the final report)
  const isComplete = messages.some(
    (m) =>
      m.role === "assistant" &&
      m.parts?.some((p: any) => p.type === "text" && p.text.includes("Interview Complete"))
  );

  if (authStatus === "loading" || !session) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[#0B0F19]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // ─── Setup Screen ───
  if (!started) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F19] text-gray-900 dark:text-gray-100 pb-20">
        <div className="relative overflow-hidden bg-white dark:bg-[#131B2C] border-b border-gray-200 dark:border-gray-800 pt-16 pb-12">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800 text-purple-600 dark:text-purple-400 text-sm font-bold mb-6">
              <Zap className="w-4 h-4" /> AI-Powered Practice
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Mock Interview Simulator
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Practice with an AI hiring manager that adapts to your target role and skills. Get real-time feedback and a final scorecard.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          {/* Interview Type Selection */}
          <div className="bg-white dark:bg-[#131B2C] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Choose Interview Type</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InterviewTypeCard
                selected={interviewType === "behavioral"}
                onClick={() => setInterviewType("behavioral")}
                icon={<MessageCircle className="w-7 h-7" />}
                title="Behavioral"
                description="STAR method, teamwork, leadership scenarios"
                color="purple"
              />
              <InterviewTypeCard
                selected={interviewType === "technical"}
                onClick={() => setInterviewType("technical")}
                icon={<Code className="w-7 h-7" />}
                title="Technical"
                description="System design, architecture, trade-offs"
                color="emerald"
              />
              <InterviewTypeCard
                selected={interviewType === "mixed"}
                onClick={() => setInterviewType("mixed")}
                icon={<Shuffle className="w-7 h-7" />}
                title="Mixed"
                description="Alternating behavioral and technical"
                color="blue"
              />
            </div>
          </div>

          {/* Optional: Custom Role */}
          <div className="bg-white dark:bg-[#131B2C] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-2">Target Role (Optional)</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Leave blank to use your profile&apos;s target role, or specify a different one.
            </p>
            <input
              type="text"
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              placeholder="e.g. Senior Frontend Engineer at Google"
              className="w-full px-5 py-4 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all shadow-sm"
            />
          </div>

          {/* What to expect */}
          <div className="bg-white dark:bg-[#131B2C] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-4">What to Expect</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-sm">5 Questions</p>
                  <p className="text-xs text-gray-500">Tailored to your role</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-sm">Real-time Feedback</p>
                  <p className="text-xs text-gray-500">After each answer</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/40 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-sm">Final Scorecard</p>
                  <p className="text-xs text-gray-500">Detailed report at the end</p>
                </div>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={startInterview}
            className="w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl group flex justify-center items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white hover:scale-[1.02] hover:shadow-2xl"
          >
            <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            Start Interview
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  // ─── Chat Interface ───
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F19] text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Chat Header */}
      <div className="sticky top-16 z-40 bg-white/80 dark:bg-[#131B2C]/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm">AI Interviewer</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{interviewType} Interview</span>
                {isLoading && (
                  <span className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping"></div>
                    Thinking...
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isComplete && isLoading && (
              <button
                onClick={stop}
                className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                title="Stop generating"
              >
                <StopCircle className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={resetInterview}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              New Session
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pb-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          {messages
            .filter((m) => m.role !== "system")
            .map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-sm ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                      : "bg-gradient-to-br from-emerald-500 to-teal-600"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-4 shadow-sm ${
                    message.role === "user"
                      ? "bg-indigo-600 text-white rounded-tr-md"
                      : "bg-white dark:bg-[#1A233A] border border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-md"
                  }`}
                >
                  {message.role === "user" ? (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.parts
                        ?.filter((p) => p.type === "text")
                        .map((p) => (p as any).text)
                        .join("")}
                    </p>
                  ) : (
                    <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-headings:my-3 prose-li:my-1 prose-strong:text-gray-900 dark:prose-strong:text-white whitespace-pre-wrap text-sm leading-relaxed">
                      {message.parts
                        ?.filter((p) => p.type === "text")
                        .map((p) => (p as any).text)
                        .join("")}
                    </div>
                  )}
                </div>
              </div>
            ))}

          {/* Loading indicator */}
          {isLoading && messages.length > 0 && messages[messages.length - 1]?.role === "user" && (
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white dark:bg-[#1A233A] border border-gray-100 dark:border-gray-800 rounded-2xl rounded-tl-md px-5 py-4 shadow-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar — Fixed at bottom */}
      {!isComplete ? (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 p-4 z-30">
          <div className="max-w-3xl mx-auto flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={isLoading ? "Wait for the interviewer..." : "Type your answer..."}
                disabled={isLoading}
                rows={1}
                className="w-full px-5 py-4 pr-14 bg-white dark:bg-[#131B2C] border border-gray-300 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all shadow-sm resize-none text-sm disabled:opacity-50"
                style={{ minHeight: "56px", maxHeight: "150px" }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputText.trim()}
              className="flex-shrink-0 p-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-2xl shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 p-4 z-30">
          <div className="max-w-3xl mx-auto flex items-center justify-center gap-4">
            <button
              onClick={resetInterview}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-2xl font-bold shadow-xl hover:scale-105 transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              Start New Interview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-Components ───

function InterviewTypeCard({
  selected,
  onClick,
  icon,
  title,
  description,
  color,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  const colorMap: Record<string, { bg: string; border: string; text: string; selectedBg: string; selectedBorder: string }> = {
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      border: "border-purple-200 dark:border-purple-800",
      text: "text-purple-600 dark:text-purple-400",
      selectedBg: "bg-purple-50 dark:bg-purple-900/30",
      selectedBorder: "border-purple-500 ring-4 ring-purple-500/20",
    },
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      border: "border-emerald-200 dark:border-emerald-800",
      text: "text-emerald-600 dark:text-emerald-400",
      selectedBg: "bg-emerald-50 dark:bg-emerald-900/30",
      selectedBorder: "border-emerald-500 ring-4 ring-emerald-500/20",
    },
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-600 dark:text-blue-400",
      selectedBg: "bg-blue-50 dark:bg-blue-900/30",
      selectedBorder: "border-blue-500 ring-4 ring-blue-500/20",
    },
  };

  const c = colorMap[color] || colorMap.purple;

  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-2xl border-2 text-left transition-all duration-200 hover:shadow-md ${
        selected ? `${c.selectedBg} ${c.selectedBorder}` : `bg-white dark:bg-[#1A233A] border-gray-200 dark:border-gray-700`
      }`}
    >
      <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center ${c.text} mb-4`}>
        {icon}
      </div>
      <h3 className="font-bold text-base mb-1">{title}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
    </button>
  );
}
