'use client';
import LoadingScreen from '@/components/loading/loading-screen';
import DeveloperOnboardingForm from '@/features/onboarding/components/developer-onboarding-form';
import CompanyOnboardingForm from '@/features/onboarding/components/recruiter-onboarding-form';
import { useUserStore } from '@/features/users/store/user-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    if (!user) {
      router.replace('/onboarding/create');
    }
  }, [user, router]);

  if (!user) {
    return <LoadingScreen fullScreen text="Loading your profile..." />;
  }

  if (!user.doOnboarding && (user.developerId || user.recruiterId)) {
    router.replace('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen">
      {user.role === 'Developer' ? <DeveloperOnboardingForm /> : <CompanyOnboardingForm />}
    </div>
  );
}
