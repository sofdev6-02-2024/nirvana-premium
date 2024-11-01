"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useSession, signIn, signOut } from "next-auth/react";
import { Bell, User, LogOut, Building2, Code2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRoleCheck } from "@/hooks/use-role-check";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { data: session, status } = useSession();
  const { isCompany, isDeveloper } = useRoleCheck();
  console.log(session)
  return (
    <header className="shadow-sm">
      <nav className="max-w-5xl m-auto px-4 py-3 flex items-stretch justify-between">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image src={logo} alt="tp chamba logo" width={30} height={30} />
          </Link>
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <Link href="/recruiters" className="hover:underline">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              Companies & Recruiters
            </div>
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="/developers" className="hover:underline">
            <div className="flex items-center">
              <span className="text-lg font-bold mr-1">&lt;&gt;</span>
              Developers
            </div>
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="/jobs" className="hover:underline">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Jobs
            </div>
          </Link>
        </div>

        {status === "authenticated" ? (
          <div className="flex items-center gap-4">
            {isCompany() && (
              <Button
                variant="default"
                size="sm"
                className="h-8 gap-1"
                asChild
              >
                <Link href="/jobs/new">
                  <Plus className="h-4 w-4" />
                  Post Job
                </Link>
              </Button>
            )}

            <Button variant="ghost" className="h-8 w-8 p-0" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0" size="icon" aria-label="Profile">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">My Account</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      {isCompany() && (
                        <>
                          <Building2 className="h-4 w-4" />
                          Company Account
                        </>
                      )}
                      {isDeveloper() && (
                        <>
                          <Code2 className="h-4 w-4" />
                          Developer Account
                        </>
                      )}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Conditional menu items based on role */}
                {isCompany() && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/jobs/new">Post a Job</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/company/dashboard">Company Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}

                {isDeveloper() && (
                  <DropdownMenuItem asChild>
                    <Link href="/developer/profile">My Developer Profile</Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-red-600"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              className="h-8 px-3 py-1"
              onClick={() => signIn("keycloak", {
                callbackUrl: window.location.pathname
              })}
            >
              Log In
            </Button>

            <Button
              variant="link"
              onClick={() => signIn("keycloak", {
                callbackUrl: "/onboarding"
              })}
            >
              Sign Up
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}