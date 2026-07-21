"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User as UserIcon, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
              <Image src="/logo.png" alt="CareerPilot AI Logo" width={32} height={32} className="rounded-lg" />
              <span>CareerPilot<span className="text-blue-600">AI</span></span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            {session ? (
              <>
                <Link href="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm font-medium">Dashboard</span>
                </Link>
                <Link href="/profile" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm font-medium">Profile</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm font-medium">Logout</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
