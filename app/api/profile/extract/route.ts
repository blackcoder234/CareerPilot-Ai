import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

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
    
    // Polyfill for pdf-parse
    if (typeof global.DOMMatrix === 'undefined') {
      (global as any).DOMMatrix = class DOMMatrix {};
    }
    if (typeof global.Path2D === 'undefined') {
      (global as any).Path2D = class Path2D {};
    }
    if (typeof global.ImageData === 'undefined') {
      (global as any).ImageData = class ImageData {};
    }

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfParseModule = require("pdf-parse");
    const pdfParse = pdfParseModule.default || pdfParseModule;
    const pdfData = await pdfParse(buffer);
    const resumeText = pdfData.text;

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
