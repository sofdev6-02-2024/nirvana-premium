import { getDeveloperById } from '@/features/developer/lib/developer-service';
import { getRecruiterById } from '@/features/recruiters/lib/recruiter-service';
import { apiRequest } from '@/lib/api';
import { Roles } from '@/types/globals';
import type { ProfileData } from '../types';

export async function loadProfileData(userId: string, role: Roles): Promise<ProfileData | null> {
  try {
    const userData =
      role === 'developer' ? await getDeveloperById(userId) : await getRecruiterById(userId);

    if (!userData?.description) {
      return null;
    }

    try {
      const profileData = JSON.parse(userData.description) as ProfileData;
      return profileData;
    } catch (error) {
      console.error('Invalid profile data format:', error);
      return null;
    }
  } catch (error) {
    console.error('Error loading profile data:', error);
    return null;
  }
}

export async function saveProfileData(
  userId: string,
  role: Roles,
  data: ProfileData,
  token: string,
): Promise<void> {
  const endpoint =
    role === 'developer'
      ? `/users-jobs/developers/${userId}/about`
      : `/users-jobs/recruiters/${userId}/about`;

  const payload =
    role === 'developer' ? { description: JSON.stringify(data) } : { about: JSON.stringify(data) };

  await apiRequest({
    endpoint,
    method: 'PATCH',
    body: payload,
    token,
  });
}
