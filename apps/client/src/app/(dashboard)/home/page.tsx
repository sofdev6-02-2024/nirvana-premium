import { LoadingSpinner } from '@/components/loading/loading-spinner';
import DevPage from '@/features/home/components/developer-page';
import RecruiterHome from '@/features/home/components/recruiter-page';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function HomePage() {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const userRole = sessionClaims?.metadata?.role as 'Developer' | 'Recruiter';

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {userRole === 'Developer' ? <DevPage /> : <RecruiterHome />}
    </Suspense>
  );
}
