'use client';

import LoadingScreen from '@/components/loading/loading-screen';
import { useUserStore } from '@/features/users/store/user-store';
import { useToast } from '@/hooks/use-toast';
import type { Roles } from '@/types/globals';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { ProfileBuilder } from '../components/editors/profile-builder';
import { loadProfileData, saveProfileData } from '../lib/profile-service';
import type { ProfileData } from '../types';

interface ProfileBuilderPageProps {
  role: Roles;
}

export default function ProfileBuilderPage({ role }: ProfileBuilderPageProps) {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUserStore();
  const { toast } = useToast();
  const { getToken } = useAuth();

  const userId = role.toLowerCase() === 'developer' ? user?.developerId : user?.recruiterId;

  useEffect(() => {
    const loadProfile = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);

        const data = await loadProfileData(userId, role);
        setProfileData(data);
      } catch (error) {
        console.error('Error loading profile:', error);
        toast({
          title: 'Error loading profile',
          description: 'Failed to load your profile data.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [userId, role, toast]);

  const handleSave = async (data: ProfileData) => {
    if (!userId) {
      toast({
        title: 'Error saving profile',
        description: `${role} ID not found.`,
        variant: 'destructive',
      });
      return;
    }

    try {
      const token = await getToken();
      if (!token) throw new Error('Authentication token not available');

      await saveProfileData(userId, role, data, token);
      toast({
        title: 'Profile saved',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: 'Error saving profile',
        description: 'Failed to save your profile changes.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!userId) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">
          {role === 'developer' ? 'Developer profile not found.' : 'Recruiter profile not found.'}
        </p>
      </div>
    );
  }

  return <ProfileBuilder role={role} initialData={profileData} onSave={handleSave} />;
}
