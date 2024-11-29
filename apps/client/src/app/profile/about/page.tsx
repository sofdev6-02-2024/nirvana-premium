'use client';

import { ProfileBuilder } from '@/features/profile/components/profile-builder';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function RecruiterProfileBuilder() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;
  if (!user) redirect('/sign-in');

  return <ProfileBuilder role="Recruiter" />;
}
