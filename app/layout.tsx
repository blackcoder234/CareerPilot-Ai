import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "CareerPilot AI",
  description: "Your Personal AI Career Advisor",
};

import { Toaster } from "react-hot-toast";
import NextTopLoader from 'nextjs-toploader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
          <NextTopLoader color="#2563eb" showSpinner={false} shadow="0 0 10px #2563eb,0 0 5px #2563eb" />
          <Navbar />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
