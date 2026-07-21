import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import connectToDatabase from "./db";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "missing_client_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "missing_client_secret",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "missing_github_id",
      clientSecret: process.env.GITHUB_SECRET || "missing_github_secret",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development_only",
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          await connectToDatabase();
          const existingUser = await User.findOne({ email: user.email });
          
          if (!existingUser) {
            await User.create({
              name: user.name || "Unknown User",
              email: user.email,
              image: user.image,
            });
          }
          return true;
        } catch (error) {
          console.error("Error saving user to DB:", error);
          if (!process.env.MONGODB_URI) {
             console.warn("Bypassing DB save because MONGODB_URI is not set.");
             return true; 
          }
          return false; // Reject signin if DB fails for other reasons
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
};
