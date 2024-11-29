'use client';
import LoadingScreen from '@/components/loading/loading-screen';
import DeveloperOnboardingForm from '@/features/onboarding/components/developer-onboarding-form';
import CompanyOnboardingForm from '@/features/onboarding/components/recruiter-onboarding-form';
import { UserService } from '@/features/users/lib/user-service';
import { useUserStore } from '@/features/users/store/user-store';
import { useAuth, useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

type LoadingState = 'initial' | 'creating-user' | 'fetching-user' | 'complete';

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const [loadingState, setLoadingState] = useState<LoadingState>('initial');
  const [error, setError] = useState(false);
  const { getToken } = useAuth();
  const { setUser, setToken, setIdentityId, user: storedUser } = useUserStore();

  useEffect(() => {
    const initializeUser = async () => {
      if (!isLoaded || !user) return;

      try {
        const token = await getToken();
        if (!token) {
          throw new Error('Failed to get authentication token');
        }
        setToken(token);

        setLoadingState('fetching-user');
        try {
          const userData = await UserService.getUserByIdentityId(user.id, token);
          setUser(userData);
          setLoadingState('complete');
          return;
        } catch (err) {
          if (err && typeof err === 'object' && 'status' in err && err.status === 404) {
            setLoadingState('creating-user');
            await UserService.createUser({
              identityId: user.id,
              role: user.unsafeMetadata.role === 'developer' ? 'Developer' : 'Recruiter',
              email: user.emailAddresses[0].emailAddress,
            });

            const userData = await UserService.getUserByIdentityId(user.id, token);
            setUser(userData);
            setLoadingState('complete');
          } else {
            throw err;
          }
        }
      } catch (err) {
        console.error('Error during user initialization:', err);
        setError(true);
        setLoadingState('complete');
      }
    };

    initializeUser();
  }, [isLoaded, user, getToken, setUser, setToken, setIdentityId]);

  if (!isLoaded || loadingState === 'initial') {
    return <LoadingScreen fullScreen text="Verifying your information..." />;
  }

  if (loadingState === 'creating-user') {
    return <LoadingScreen fullScreen text="Setting up your account..." />;
  }

  if (loadingState === 'fetching-user') {
    return <LoadingScreen fullScreen text="Loading your profile..." />;
  }

  if (!user || !storedUser) {
    return <LoadingScreen fullScreen text="Please sign in to continue..." />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg bg-card p-6 text-center shadow-lg">
          <h2 className="mb-4 text-lg font-semibold">Oops! Something went wrong</h2>
          <p className="text-muted-foreground">
            We could not complete your account setup. Please try again later or contact support if
            the problem persists.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {storedUser.role === 'Developer' ? <DeveloperOnboardingForm /> : <CompanyOnboardingForm />}
    </div>
  );
}
