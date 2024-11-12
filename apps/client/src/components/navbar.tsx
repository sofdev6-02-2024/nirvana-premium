"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { Building2, Code2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ui/mode-toggle";

export default function Navbar() {
  const { user, isSignedIn } = useUser();

  const isCompany = () => user?.unsafeMetadata.role === "recruiter";
  const isDeveloper = () => user?.unsafeMetadata.role === "developer";

  return (
    <header className="shadow-sm">
      <nav className="m-auto flex max-w-5xl items-stretch justify-between px-4 py-3">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image src={logo} alt="tp chamba logo" width={30} height={30} />
          </Link>
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <Link href="/recruiters" className="hover:underline">
            <div className="flex items-center">
              <Building2 className="mr-1 h-5 w-5" />
              Companies & Recruiters
            </div>
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="/developers" className="hover:underline">
            <div className="flex items-center">
              <Code2 className="mr-1 h-5 w-5" />
              Developers
            </div>
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="/jobs" className="hover:underline">
            <div className="flex items-center">
              <svg
                className="mr-1 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              Jobs
            </div>
          </Link>
        </div>

        {isSignedIn ? (
          <div className="flex items-center gap-4">
            {isCompany() && (
              <Button variant="default" size="sm" className="h-8 gap-1" asChild>
                <Link href="/jobs/new">
                  <Plus className="h-4 w-4" />
                  Post Job
                </Link>
              </Button>
            )}
            <ModeToggle />
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                },
              }}
            />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <ModeToggle />
            <SignInButton mode="modal">
              <Button variant="link" className="h-8 px-3 py-1">
                Log In
              </Button>
            </SignInButton>
            <Button
              variant="default"
              onClick={() => {
                window.location.href = "/sign-up";
              }}
            >
              Sign Up
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
