'use client';

import DeveloperOnboardingForm from '@/features/onboarding/components/developer-onboarding-form';
import CompanyOnboardingForm from '@/features/onboarding/components/recruiter-onboarding-form';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const isDeveloper = user?.unsafeMetadata.role === 'developer';

  useEffect(() => {
    if (!isLoaded) return;
    if (user?.unsafeMetadata.onboardingComplete === true) {
      router.push('/home');
    }
  }, [user, isLoaded, router]);

  if (user?.unsafeMetadata.onboardingComplete === true) {
    return null;
  }

  return <>{isDeveloper ? <DeveloperOnboardingForm /> : <CompanyOnboardingForm />}</>;
}
