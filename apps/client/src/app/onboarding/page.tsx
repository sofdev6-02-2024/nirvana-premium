'use client';
import LoadingScreen from '@/components/loading/loading-screen';
import DeveloperOnboardingForm from '@/features/onboarding/components/developer-onboarding-form';
import CompanyOnboardingForm from '@/features/onboarding/components/recruiter-onboarding-form';
import { UserService } from '@/features/users/lib/user-service';
import { Roles } from '@/types/globals';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type LoadingState = 'initial' | 'creating-user' | 'redirecting' | 'complete';

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [loadingState, setLoadingState] = useState<LoadingState>('initial');
  const [error, setError] = useState(false);

  const getBackendRole = (clerkRole: string): Roles => {
    return clerkRole === 'developer' ? 'Developer' : 'Recruiter';
  };

  const isDeveloper = user?.unsafeMetadata.role === 'developer';

  useEffect(() => {
    const initializeUser = async () => {
      if (!isLoaded || !user) return;

      try {
        if (user.unsafeMetadata.onboardingComplete === true) {
          setLoadingState('redirecting');
          await router.push('/home');
          return;
        }

        setLoadingState('creating-user');

        await UserService.createUser({
          identityId: user.id,
          role: getBackendRole(user.unsafeMetadata.role as string),
          email: user.emailAddresses[0].emailAddress,
        });

        setLoadingState('complete');
      } catch (err) {
        console.error('Error during user initialization:', err);
        setError(true);
        setLoadingState('complete');
      }
    };

    initializeUser();
  }, [isLoaded, user, router]);

  if (!isLoaded || loadingState === 'initial') {
    return <LoadingScreen fullScreen text="Verifying your information..." />;
  }

  if (loadingState === 'creating-user') {
    return <LoadingScreen fullScreen text="Setting up your account..." />;
  }

  if (loadingState === 'redirecting') {
    return <LoadingScreen fullScreen text="Taking you to your dashboard..." />;
  }

  if (!user) {
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
      {isDeveloper ? <DeveloperOnboardingForm /> : <CompanyOnboardingForm />}
    </div>
  );
}
