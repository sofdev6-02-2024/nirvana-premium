'use client';

import { Roles } from '@/types/globals';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { ProfileBuilder } from '../components/editors/profile-builder';
import { createDefaultProfileData } from '../lib/utils';

interface ProfileBuilderPageProps {
  role: Roles;
}

export default function ProfileBuilderPage({ role }: ProfileBuilderPageProps) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;
  if (!user) redirect('/sign-in');

  return (
    <ProfileBuilder
      role="developer"
      initialData={createDefaultProfileData()}
      onSave={async (data) => {
        console.log('Saving profile:', data);
      }}
      userId={''}
    />
  );
}
