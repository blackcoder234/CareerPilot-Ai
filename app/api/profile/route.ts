import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Profile from "@/models/Profile";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { targetRole, skills } = await req.json();
    const skillsArray = skills.split(",").map((s: string) => s.trim()).filter((s: string) => s !== "");

    await connectToDatabase();
    
    const profile = await Profile.findOneAndUpdate(
      { userId: (session.user as any).id },
      { 
        targetRole,
        skills: skillsArray,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ profile }, { status: 200 });
  } catch (error) {
    console.error("Profile API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const profile = await Profile.findOne({ userId: (session.user as any).id });

    return NextResponse.json({ profile }, { status: 200 });
  } catch (error) {
    console.error("Profile API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
