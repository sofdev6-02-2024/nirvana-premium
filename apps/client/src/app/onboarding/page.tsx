"use client";

import { useUser } from "@clerk/nextjs";
import CompanyOnboardingForm from "@/features/onboarding/components/recruiter-onboarding-form";
import DeveloperOnboardingForm from "@/features/onboarding/components/developer-onboarding-form";

export default function OnboardingPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const isDeveloper = user?.unsafeMetadata.role === "developer";

  return (
    <>{isDeveloper ? <DeveloperOnboardingForm /> : <CompanyOnboardingForm />}</>
  );
}
