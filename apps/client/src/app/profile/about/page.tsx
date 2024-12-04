'use client';

import ProfileBuilderPage from '@/features/profile/page/profile-builder-page';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function RecruiterProfileBuilder() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;
  if (!user) redirect('/sign-in');

  return <ProfileBuilderPage role="Recruiter" />;
}
