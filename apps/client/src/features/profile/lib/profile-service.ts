import { ProfileData } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const profileStore: Record<string, ProfileData> = {};

export const profileService = {
  getProfile: async (userId: string): Promise<ProfileData | null> => {
    await delay(800);
    return profileStore[userId] || null;
  },

  saveProfile: async (userId: string, data: ProfileData): Promise<ProfileData> => {
    await delay(1000);

    const updatedProfile = {
      ...data,
      metadata: {
        ...data.metadata,
        lastUpdated: new Date().toISOString(),
      },
    };

    profileStore[userId] = updatedProfile;
    return updatedProfile;
  },

  saveDraft: async (userId: string, data: ProfileData): Promise<void> => {
    await delay(500);
    profileStore[`${userId}_draft`] = {
      ...data,
      metadata: {
        ...data.metadata,
        isDraft: true,
        lastUpdated: new Date().toISOString(),
      },
    };
  },

  getDraft: async (userId: string): Promise<ProfileData | null> => {
    await delay(500);
    return profileStore[`${userId}_draft`] || null;
  },

  deleteDraft: async (userId: string): Promise<void> => {
    await delay(500);
    delete profileStore[`${userId}_draft`];
  },

  publishProfile: async (userId: string, data: ProfileData): Promise<ProfileData> => {
    await delay(1000);
    const publishedProfile = {
      ...data,
      metadata: {
        ...data.metadata,
        isPublished: true,
        publishedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      },
    };

    profileStore[userId] = publishedProfile;
    return publishedProfile;
  },
};
