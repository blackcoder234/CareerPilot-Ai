import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import PDFParser from "pdf2json";
import connectToDatabase from "@/lib/db";
import Profile from "@/models/Profile";
import Resume from "@/models/Resume";

// Node.js runtime is required for pdf-parse
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Read the PDF
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Parse PDF using pdf2json
    const resumeText = await new Promise<string>((resolve, reject) => {
      const pdfParser = new (PDFParser as any)(null, 1);
      pdfParser.on("pdfParser_dataError", (errData: any) => reject(errData.parserError));
      pdfParser.on("pdfParser_dataReady", () => {
        resolve((pdfParser as any).getRawTextContent());
      });
      pdfParser.parseBuffer(buffer);
    });

    // Fetch user profile to get context
    await connectToDatabase();
    const profile = await Profile.findOne({ email: session.user.email });
    const targetRole = profile?.targetRole || "General Job Application";
    const skills = profile?.skills?.join(", ") || "Not specified";

    const systemPrompt = `
      You are an expert ATS (Applicant Tracking System) and Senior Career Coach.
      Your task is to analyze the user's resume for the target role: "${targetRole}".
      User's key skills are: ${skills}.

      Provide a comprehensive review using this exact markdown structure:
      
      ## ATS Score
      [Give a score out of 100 based on keyword match, impact, and formatting]
      
      ## Summary & Overall Impression
      [1-2 paragraphs giving your overall thoughts]
      
      ## Strengths
      - [Point 1]
      - [Point 2]
      
      ## Areas for Improvement (Critical)
      - [Point 1]
      - [Point 2]
      
      ## Keyword Optimization
      [Suggest keywords to add or remove for this specific role]
    `;

    // Stream the LLM response
    const result = streamText({
      model: google("gemini-1.5-flash-latest"),
      system: systemPrompt,
      prompt: `Here is the text extracted from the user's resume:\n\n${resumeText}`,
      async onFinish({ text }) {
        // Parse the text to extract the ATS Score using a simple regex if possible, 
        // or just default to parsing it roughly. 
        let atsScore = 0;
        const scoreMatch = text.match(/## ATS Score\s*(\d+)/i);
        if (scoreMatch && scoreMatch[1]) {
          atsScore = parseInt(scoreMatch[1], 10);
        }

        try {
          // If no DB connection exists because user didn't set MONGODB_URI, skip saving
          if (process.env.MONGODB_URI) {
            await connectToDatabase();
            await Resume.create({
              userId: session.user?.email || "unknown", // using email as identifier
              fileName: file.name,
              atsScore: atsScore,
              feedback: text,
            });
          }
        } catch (dbErr) {
          console.error("Failed to save resume to database:", dbErr);
        }
      }
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("Resume analysis error:", error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
