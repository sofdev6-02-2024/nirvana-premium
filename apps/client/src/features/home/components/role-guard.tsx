'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type UserRole = 'developer' | 'recruiter';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export function RoleGuard({ children, allowedRole }: RoleGuardProps) {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }

    const userRole = user?.publicMetadata?.role as UserRole;

    if (userRole !== allowedRole) {
      router.push('/access-denied');
      return;
    }

    setIsAuthorized(true);
  }, [isLoaded, isSignedIn, user, router, allowedRole]);

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
