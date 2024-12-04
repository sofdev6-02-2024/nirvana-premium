'use client';
import LoadingScreen from '@/components/loading/loading-screen';
import { UserService } from '@/features/users/lib/user-service';
import { useUserStore } from '@/features/users/store/user-store';
import { Roles } from '@/types/globals';
import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const formatRole = (role: string): Roles => {
  const formatted = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  if (formatted !== 'Developer' && formatted !== 'Recruiter') {
    throw new Error(`Invalid role: ${role}`);
  }
  return formatted as Roles;
};

export default function CreateUserPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const { setUser, setToken } = useUserStore();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      if (!isLoaded || !user) return;

      try {
        const token = await getToken();
        if (!token) throw new Error('No token available');

        setToken(token);
        const role = formatRole(user.unsafeMetadata.role as string);

        console.log('Creating user with:', {
          identityId: user.id,
          role,
          email: user.emailAddresses[0].emailAddress,
        });
        await UserService.createUser({
          identityId: user.id,
          role,
          email: user.emailAddresses[0].emailAddress,
        });

        const newUser = await UserService.getUserByIdentityId(user.id, token);
        console.log('Created user:', newUser);

        setUser(newUser);

        router.push('/onboarding');
      } catch (error) {
        console.error('Error during user creation:', error);
        setError(error instanceof Error ? error.message : 'Failed to create user account.');
      } finally {
        setIsProcessing(false);
      }
    };

    initializeUser();
  }, [isLoaded, user, getToken, setUser, setToken, router]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg bg-card p-6 text-center shadow-lg">
          <h2 className="mb-4 text-lg font-semibold">Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return <LoadingScreen fullScreen text="Setting up your account..." />;
  }

  return <LoadingScreen fullScreen text="Loading..." />;
}
