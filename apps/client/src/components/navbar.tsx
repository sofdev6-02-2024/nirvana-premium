'use client';

import logo from '@/assets/logo.png';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useUserStore } from '@/features/users/store/user-store';
import { cn } from '@/lib/utils';
import { UserButton, useUser } from '@clerk/nextjs';
import { Briefcase, Building2, Code2, HomeIcon, LucideIcon, Menu, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { ModeToggle } from './ui/mode-toggle';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface AuthButtonsProps {
  className?: string;
  variant?: 'mobile' | 'desktop';
}

const mainNavItems: NavItem[] = [
  { href: '/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/recruiters', label: 'Companies', icon: Building2 },
  { href: '/developers', label: 'Developers', icon: Code2 },
];

const AuthButtons: React.FC<AuthButtonsProps> = ({ className, variant = 'desktop' }) => {
  const isMobile = variant === 'mobile';

  return (
    <div className={cn('flex items-center gap-2', isMobile && 'flex-col w-full', className)}>
      <Button variant="ghost" className={cn('h-11', isMobile && 'w-full')}>
        <Link href="/sign-in">Log In</Link>
      </Button>
      <Button variant="default" className={cn('h-11', isMobile && 'w-full')}>
        <Link href="/sign-up">Sign Up</Link>
      </Button>
    </div>
  );
};

const RecruiterNavItems: React.FC = () => {
  const pathname = usePathname();

  const items: NavItem[] = [
    { href: '/home', label: 'Home', icon: Briefcase },
    { href: '/profile/about', label: 'Profile', icon: Building2 },
    { href: '/jobs/new', label: 'New Job', icon: Plus },
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
              'flex items-center min-h-[44px] px-3 rounded-md gap-2 w-full',
              'hover:bg-accent hover:text-accent-foreground transition-colors',
              pathname === item.href && 'bg-accent',
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

const DeveloperNavItems: React.FC = () => {
  const pathname = usePathname();

  const items: NavItem[] = [
    { href: '/home', label: 'Home', icon: Briefcase },
    { href: '/profile/portafolio', label: 'Your CV', icon: Building2 },
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
              'flex items-center min-h-[44px] px-3 rounded-md gap-2 w-full',
              'hover:bg-accent hover:text-accent-foreground transition-colors',
              pathname === item.href && 'bg-accent',
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
type UserMetadata = {
  role: string;
};

const Navbar: React.FC = () => {
  const { user, isSignedIn } = useUser();
  const pathname = usePathname();

  const role = (user?.unsafeMetadata as UserMetadata)?.role;
  const isCompany = role?.toLowerCase() === 'recruiter';
  const isDeveloper = role?.toLowerCase() === 'developer';

  const clearStore = useUserStore((state) => state.clearStore);

  useEffect(() => {
    if (!isSignedIn) {
      console.log('User signed out, clearing store...');
      const beforeClear = localStorage.getItem('user-storage');
      clearStore();
      const afterClear = localStorage.getItem('user-storage');
      console.log('Store before:', beforeClear);
      console.log('Store after:', afterClear);
    }
  }, [isSignedIn, clearStore]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/icon512_maskable.png" />
      <link rel="icon" href="/icon512_rounded.png" />
      <nav className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2 min-h-[44px] min-w-[44px]">
          <Image src={logo} alt="tp chamba logo" width={30} height={30} priority />
        </Link>

        <div className="hidden md:flex items-center ml-6 space-x-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center min-h-[44px] px-3 rounded-md gap-2 text-foreground',
                  'hover:bg-accent transition-colors',
                  pathname === item.href && 'bg-accent',
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-2">
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
                          'flex items-center min-h-[44px] px-3 rounded-md gap-2 w-full',
                          'hover:bg-accent hover:text-accent-foreground transition-colors',
                          pathname === item.href && 'bg-accent',
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>

                {isSignedIn && (
                  <div className="space-y-1">
                    <SheetHeader className="text-left pb-4">
                      <SheetTitle>Dashboard</SheetTitle>
                    </SheetHeader>
                    {isCompany && <RecruiterNavItems />}
                    {isDeveloper && <DeveloperNavItems />}
                  </div>
                )}

                <div className="space-y-1">
                  <SheetHeader className="text-left pb-4">
                    <SheetTitle>Actions</SheetTitle>
                  </SheetHeader>
                  <ModeToggle variant="mobile" />
                </div>

                {!isSignedIn && (
                  <div className="space-y-1">
                    <SheetHeader className="text-left pb-4">
                      <SheetTitle>Account</SheetTitle>
                    </SheetHeader>
                    <AuthButtons variant="mobile" />
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <div className="hidden md:flex min-h-[44px] min-w-[44px] items-center">
            {isSignedIn ? (
              <Button
                variant="ghost"
                size="icon"
                className={cn('text-muted-foreground hover:text-accent-foreground hover:bg-accent')}
                asChild
              >
                <Link href="/home">
                  <HomeIcon />
                </Link>
              </Button>
            ) : (
              <div></div>
            )}
            <ModeToggle />
          </div>

          {isSignedIn ? (
            <CustomUserButton />
          ) : (
            <div className="hidden md:block">
              <AuthButtons />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

const CustomUserButton: React.FC = () => {
  const { isSignedIn } = useUser();
  const clearStore = useUserStore((state) => state.clearStore);

  useEffect(() => {
    if (!isSignedIn) {
      clearStore();
    }
  }, [isSignedIn, clearStore]);

  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: 'h-11 w-11',
        },
      }}
    />
  );
};
export default Navbar;
