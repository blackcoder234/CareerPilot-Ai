import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import PDFParser from "pdf2json";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !(session.user as any).id) {
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

    const { object } = await generateObject({
      model: google("gemini-1.5-flash"),
      schema: z.object({
        skills: z.array(z.string()).describe("A list of top technical and soft skills extracted from the resume"),
        experience: z.array(z.string()).describe("A list of work experiences formatted cleanly, e.g. 'Software Engineer at Google (2020-Present) - Key achievement'"),
        education: z.array(z.string()).describe("A list of educational degrees, e.g. 'B.S. in Computer Science from Stanford University (2019)'"),
      }),
      prompt: `Extract the candidate's skills, work experience, and education from the following resume text:\n\n${resumeText}`,
    });

    return NextResponse.json({ profileData: object }, { status: 200 });

  } catch (error: any) {
    console.error("Extraction API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to extract profile data" }, { status: 500 });
  }
}
