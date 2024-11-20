// components/navbar.tsx
'use client';

import { Button } from '@/components/ui/button';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { Building2, Code2, Briefcase, Menu, Plus, Sun, Moon, LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { usePathname } from 'next/navigation';
import logo from '@/assets/logo.png';
import { ModeToggle } from './ui/mode-toggle';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const mainNavItems: NavItem[] = [
  { href: '/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/recruiters', label: 'Companies', icon: Building2 },
  { href: '/developers', label: 'Developers', icon: Code2 },
];

const RecruiterNavItems = () => {
  const pathname = usePathname();

  const items = [
    { href: '/dashboard', label: 'Dashboard', icon: Briefcase },
    { href: '/dashboard/jobs', label: 'My Jobs', icon: Building2 },
    { href: '/dashboard/applicants', label: 'Applicants', icon: Code2 },
    { href: '/dashboard/profile', label: 'Profile', icon: Building2 },
  ];

  return (
    <div className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center min-h-[44px] px-3 rounded-md gap-2 w-full",
              "hover:bg-accent hover:text-accent-foreground transition-colors",
              pathname === item.href && "bg-accent"
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

const DeveloperNavItems = () => {
  const pathname = usePathname();

  const items = [
    { href: '/dashboard', label: 'Dashboard', icon: Briefcase },
    { href: '/dashboard/applications', label: 'Applications', icon: Building2 },
    { href: '/dashboard/profile', label: 'Profile', icon: Code2 },
  ];

  return (
    <div className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center min-h-[44px] px-3 rounded-md gap-2 w-full",
              "hover:bg-accent hover:text-accent-foreground transition-colors",
              pathname === item.href && "bg-accent"
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};


export default function Navbar() {
  const { user, isSignedIn } = useUser();
  const pathname = usePathname();
  const isCompany = user?.unsafeMetadata.role === 'recruiter';
  const isDeveloper = user?.unsafeMetadata.role === 'developer';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 min-h-[44px] min-w-[44px]">
          <Image src={logo} alt="tp chamba logo" width={30} height={30} priority />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center ml-6 space-x-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center min-h-[44px] px-3 rounded-md gap-2",
                  "hover:bg-accent hover:text-accent-foreground transition-colors",
                  pathname === item.href && "bg-accent"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Auth Section */}
        <div className="ml-auto flex items-center gap-2">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-11 w-11">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] p-6">
              <div className="flex flex-col gap-6">
                {/* Main Navigation */}
                <div className="space-y-1">
                  <SheetHeader className="text-left pb-4">
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  {mainNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center min-h-[44px] px-3 rounded-md gap-2 w-full",
                          "hover:bg-accent hover:text-accent-foreground transition-colors",
                          pathname === item.href && "bg-accent"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Role-specific Navigation */}
                {isSignedIn && (
                  <div className="space-y-1">
                    <SheetHeader className="text-left pb-4">
                      <SheetTitle>Dashboard</SheetTitle>
                    </SheetHeader>
                    {isCompany && <RecruiterNavItems />}
                    {isDeveloper && <DeveloperNavItems />}
                  </div>
                )}

                {/* Actions Section */}
                <div className="space-y-1">
                  <SheetHeader className="text-left pb-4">
                    <SheetTitle>Actions</SheetTitle>
                  </SheetHeader>
                  <ModeToggle variant='mobile' />
                  {isCompany && (
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full justify-start gap-2 h-11"
                      asChild
                    >
                      <Link href="/jobs/new">
                        <Plus className="h-4 w-4" />
                        Post Job
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Theme Toggle */}
          <div className="hidden md:flex min-h-[44px] min-w-[44px] items-center">
            <ModeToggle />
          </div>

          {/* Desktop Post Job Button */}
          {isSignedIn && isCompany && (
            <div className="hidden md:flex">
              <Button variant="default" size="sm" className="h-11 gap-1" asChild>
                <Link href="/jobs/new">
                  <Plus className="h-4 w-4" />
                  Post Job
                </Link>
              </Button>
            </div>
          )}

          {/* Auth Buttons */}
          {isSignedIn ? (
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: 'h-11 w-11',
                },
              }}
            />
          ) : (
            <div className="flex items-center gap-2">
              <SignInButton mode="modal">
                <Button variant="ghost" className="h-11">
                  Log In
                </Button>
              </SignInButton>
              <Button
                variant="default"
                className="h-11"
                onClick={() => {
                  window.location.href = '/sign-up';
                }}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}