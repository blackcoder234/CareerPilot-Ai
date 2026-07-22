"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User as UserIcon, LayoutDashboard, ChevronDown } from "lucide-react";
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

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
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex items-center gap-2 focus:outline-none bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full py-1.5 px-1.5 pr-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      {session.user?.name ? session.user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate max-w-[120px]">
                      {session.user?.name}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-500" aria-hidden="true" />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 dark:divide-gray-800 rounded-xl bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 focus:outline-none">
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/dashboard"
                            className={`${
                              active ? 'bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium transition-colors`}
                          >
                            <LayoutDashboard className="mr-2 h-4 w-4" aria-hidden="true" />
                            Dashboard
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/profile"
                            className={`${
                              active ? 'bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium transition-colors`}
                          >
                            <UserIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                            Profile
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => signOut()}
                            className={`${
                              active ? 'bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-gray-100'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium transition-colors`}
                          >
                            <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
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
