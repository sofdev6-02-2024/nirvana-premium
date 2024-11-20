'use client';

import DeveloperOnboardingForm from '@/features/onboarding/components/developer-onboarding-form';
import CompanyOnboardingForm from '@/features/onboarding/components/recruiter-onboarding-form';
import { useUser } from '@clerk/nextjs';

export default function OnboardingPage() {
  const { user } = useUser();
  const isDeveloper = user?.unsafeMetadata.role === 'developer';

  return <>{isDeveloper ? <DeveloperOnboardingForm /> : <CompanyOnboardingForm />}</>;
}
