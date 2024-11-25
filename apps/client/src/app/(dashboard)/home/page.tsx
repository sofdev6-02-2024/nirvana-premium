'use client';

import DevPage from '@/features/home/components/developer-page';
import RecruiterHome from '@/features/home/components/recruiter-page';
import { useUser } from '@clerk/nextjs';

export default function HomePage() {
  const { user, isLoaded } = useUser();
  const userRole = user?.unsafeMetadata?.role as 'developer' | 'recruiter';
  if (!isLoaded) {
    return null;
  }
  if (userRole === 'developer') {
    return <DevPage />;
  }
  return <RecruiterHome />;
}
