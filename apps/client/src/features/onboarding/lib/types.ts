export interface Company {
  name: string;
  location: string;
  description: string;
  profilePictureUrl?: string;
  isVerified: boolean;
  isActive: boolean;
  userId: string;
}

export interface StepFields {
  personal: ['firstName', 'lastName'];
  skills: ['skills', 'specialty', 'yearsOfExperience', 'spokenLanguages'];
  preferences: ['modality', 'expectedSalary', 'portfolioUrl'];
}

export type StepId = keyof StepFields;

export interface Step {
  id: StepId;
  name: string;
}

export interface CreateDeveloperData {
  userId: string;
  firstName: string;
  lastName: string;
  modality: 'Remote' | 'Hybrid' | 'On Site';
  yearsOfExperience: number;
  salaryExpected: number;
  location: string;
  profilePicture?: string | File | null;
  portfolioUrl?: string | null;
  specializationId: string;
  skills: string[];
  spokenLanguages: string[];
}
