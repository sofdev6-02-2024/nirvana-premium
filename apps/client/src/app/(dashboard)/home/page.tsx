import LoadingScreen from '@/components/loading/loading-screen';
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

  const userRole = sessionClaims?.metadata?.role as
    | 'Developer'
    | 'Recruiter'
    | 'develoer'
    | 'recruiter';
  const formatRole = userRole.toLowerCase();

  return (
    <Suspense fallback={<LoadingScreen fullScreen text="Loading home..." />}>
      {formatRole === 'developer' ? <DevPage /> : <RecruiterHome />}
    </Suspense>
  );
}
