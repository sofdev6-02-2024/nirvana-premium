import { Roles } from '@/types/globals';
import { Section } from './sections';
import { ProfileTheme } from './theme';

export interface Profile {
  id: string;
  userId: string;
  sections: Section[];
  theme: ProfileTheme;
  metadata: {
    lastUpdated: string;
    createdAt: string;
    isPublished: boolean;
    version: number;
  };
}

export interface DeveloperData {
  id: string;
  name: string;
  lastName: string;
  yearsOfExperience: number;
  salaryPerHourExpected: number;
  location: string;
  portfolioUrl?: string;
  profilePictureUrl?: string;
  description?: string;
  specialization: {
    id: string;
    name: string;
  };
  skills: Array<{
    id: string;
    name: string;
  }>;
  spokenLanguages: Array<{
    id: string;
    name: string;
  }>;
}

export interface ProfileData {
  sections: Section[];
  theme: ProfileTheme;
  metadata: {
    lastUpdated: string;
    createdAt: string;
    isPublished: boolean;
    version: number;
    isDraft: boolean;
  };
}

export interface SaveProfileRequest {
  description: string;
}

export interface ProfileBuilderProps {
  role: Roles;
  initialData?: ProfileData;
  onSave: (data: ProfileData) => Promise<void>;
}

export interface DevCardProps {
  developer: DeveloperData;
}

export interface ProfileViewProps {
  data: string;
  developer: DeveloperData;
}

export type PreviewSize = 'mobile' | 'tablet' | 'desktop';
