import { streamText, convertToModelMessages } from "ai";
import { google } from "@ai-sdk/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Profile from "@/models/Profile";
import User from "@/models/User";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { messages, interviewType = "behavioral", targetRole: clientRole } = await req.json();

    // Fetch the user's profile for context
    let profileContext = "";
    let targetRole = clientRole || "Software Engineer";

    try {
      await connectToDatabase();
      const user = await User.findOne({ email: session.user.email });
      if (user) {
        const profile = await Profile.findOne({ userId: user._id });
        if (profile) {
          if (profile.targetRole) targetRole = profile.targetRole;
          const skills = profile.skills?.join(", ") || "Not specified";
          const experience = profile.experience?.join("; ") || "Not specified";
          profileContext = `
The candidate's profile:
- Target Role: ${targetRole}
- Skills: ${skills}
- Experience: ${experience}
`;
        }
      }
    } catch (dbErr) {
      console.error("Failed to fetch profile for interview context:", dbErr);
    }

    // Build the system prompt based on interview type
    const typeInstructions = {
      behavioral: `You are conducting a BEHAVIORAL interview. Focus on:
- Situational and behavioral questions (STAR method)
- Leadership, teamwork, conflict resolution, decision-making
- Culture fit and communication skills
- Ask questions like "Tell me about a time when...", "Give an example of...", "How would you handle..."`,
      technical: `You are conducting a TECHNICAL interview. Focus on:
- System design and architecture questions appropriate for the role
- Technical problem-solving and analytical thinking
- Technology-specific knowledge related to the candidate's skills
- Ask questions about trade-offs, scalability, and best practices
- Do NOT ask coding/algorithm questions (those belong in Coding Arena)`,
      mixed: `You are conducting a MIXED interview combining behavioral and technical questions. Alternate between:
- Behavioral questions (STAR method, leadership, teamwork)
- Technical questions (system design, architecture, technical knowledge)
- Start with a behavioral question to warm up, then alternate`,
    };

    const systemPrompt = `You are an expert Senior Hiring Manager conducting a mock interview for a "${targetRole}" position. You are professional, supportive but rigorous.

${typeInstructions[interviewType as keyof typeof typeInstructions] || typeInstructions.behavioral}

${profileContext}

CRITICAL RULES:
1. Ask exactly ONE question at a time. Never ask multiple questions in a single message.
2. After the candidate answers, give brief, specific feedback (2-3 sentences) on their answer highlighting what was good and what could be improved.
3. Then immediately ask the next question.
4. Keep track of the question number. You will ask exactly 5 questions total.
5. After the 5th answer, provide a FINAL INTERVIEW REPORT instead of asking another question.

FINAL INTERVIEW REPORT FORMAT (use this exact format after the 5th answer):
---
## 📊 Interview Complete — Final Report

**Overall Score: [X]/100**

### Question-by-Question Breakdown:
1. **[Question topic]** — Score: [X]/20 — [One-line feedback]
2. **[Question topic]** — Score: [X]/20 — [One-line feedback]
3. **[Question topic]** — Score: [X]/20 — [One-line feedback]
4. **[Question topic]** — Score: [X]/20 — [One-line feedback]
5. **[Question topic]** — Score: [X]/20 — [One-line feedback]

### 💪 Strengths:
- [Strength 1]
- [Strength 2]

### 🔧 Areas for Improvement:
- [Area 1]
- [Area 2]

### 🎯 Actionable Tips:
- [Tip 1]
- [Tip 2]
---

START by greeting the candidate briefly (one sentence), then immediately ask Question 1. Do NOT give a long introduction.`;

    const result = streamText({
      model: google("gemini-flash-latest"),
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error("Interview chat error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Something went wrong" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
