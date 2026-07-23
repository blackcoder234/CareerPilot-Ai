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
import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col bg-gray-50 dark:bg-[#0B0F19]">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
            <NextTopLoader color="#4f46e5" showSpinner={false} shadow="0 0 10px #4f46e5,0 0 5px #4f46e5" zIndex={1600} />
            <Navbar />
            <div className="flex-1 flex flex-col">
              {children}
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
