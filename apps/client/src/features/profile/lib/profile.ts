import { ProfileData } from './types';

export const serializeProfile = (data: ProfileData): string => {
  return JSON.stringify(data);
};

export const parseProfile = (text: string): ProfileData => {
  try {
    return JSON.parse(text);
  } catch {
    return { sections: [] };
  }
};

export const generateSectionId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export type SectionType =
  | 'about'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'mission'
  | 'success-stories'
  | 'contact'
  | 'company-benefits';

export const SECTION_CONFIGS = {
  developer: [
    { type: 'about', label: 'About Me' },
    { type: 'skills', label: 'Skills' },
    { type: 'experience', label: 'Experience' },
    { type: 'projects', label: 'Projects' },
    { type: 'contact', label: 'Contact' },
  ],
  recruiter: [
    { type: 'about', label: 'About Company' },
    { type: 'mission', label: 'Mission & Values' },
    { type: 'company-benefits', label: 'Company Benefits' },
    { type: 'success-stories', label: 'Success Stories' },
    { type: 'contact', label: 'Contact Information' },
  ],
} as const;
