'use client';

import LoadingScreen from '@/components/loading/loading-screen';
import DeveloperOnboardingForm from '@/features/onboarding/components/developer-onboarding-form';
import CompanyOnboardingForm from '@/features/onboarding/components/recruiter-onboarding-form';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const isDeveloper = user?.unsafeMetadata.role === 'developer';
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      if (!isLoaded) return;

      if (user?.unsafeMetadata.onboardingComplete === true) {
        setIsRedirecting(true);
        await router.push('/home');
      }
    };

    checkOnboarding();
  }, [user, isLoaded, router]);

  if (!isLoaded) {
    return <LoadingScreen fullScreen text="Verifying your information..." />;
  }

  if (isRedirecting) {
    return <LoadingScreen fullScreen text="Taking you to your dashboard..." />;
  }

  if (user?.unsafeMetadata.onboardingComplete === true) {
    return null;
  }

  if (!user) {
    return <LoadingScreen fullScreen text="Please sign in to continue..." />;
  }

  return (
    <div className="min-h-screen">
      {isDeveloper ? <DeveloperOnboardingForm /> : <CompanyOnboardingForm />}
    </div>
  );
}
