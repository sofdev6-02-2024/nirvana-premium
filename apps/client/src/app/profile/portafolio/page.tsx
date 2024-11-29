'use client';

import { ProfileBuilder } from '@/features/profile/components/profile-builder';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function PortafolioPage() {
  const { user, isLoaded } = useUser();
  const userRole = user?.unsafeMetadata?.role as 'Developer' | 'Recruiter';

  if (!isLoaded) return null;
  if (!user) redirect('/sign-in');
  if (userRole !== 'Developer') redirect('/profile-builder');

  return <ProfileBuilder role="Developer" />;
}
