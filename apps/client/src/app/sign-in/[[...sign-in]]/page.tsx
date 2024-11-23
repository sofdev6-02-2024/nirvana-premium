'use client';

import LoadingScreen from '@/components/loading/loading-screen';
import { SignIn, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AppearanceProps {
  elements: {
    rootBox: string;
    card: string;
  };
}

export default function SignInPage(): JSX.Element {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  console.log(user);
  useEffect(() => {
    if (isLoaded && user) {
      const metadata = user.unsafeMetadata as CustomJwtSessionClaims;
      router.push(metadata.onboardingComplete ? '/home' : '/onboarding');
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return <LoadingScreen fullScreen text="..." />;
  }

  const appearance: AppearanceProps = {
    elements: {
      rootBox: 'mx-auto w-full max-w-md',
      card: 'rounded-xl shadow-lg',
    },
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/home"
        appearance={appearance}
      />
    </div>
  );
}
