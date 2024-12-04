import {
  AboutContent,
  BenefitsContent,
  ContactContent,
  CultureContent,
  ExperienceContent,
  MissionContent,
  ProjectContent,
  SkillContent,
  TeamContent,
} from '../types';
import { Profile, ProfileData } from '../types/base';
import { SectionType } from '../types/sections';
import { COMPANY_TEMPLATES, CompanyTemplate, DEFAULT_THEME, ProfileTheme } from '../types/theme';

export const isValidProfileData = (data: unknown): data is Profile => {
  return true;
};

export const createDefaultProfile = (userId: string): Profile => ({
  id: crypto.randomUUID(),
  userId,
  sections: [],
  theme: {
    ...COMPANY_TEMPLATES.google,
    template: 'google',
  } as ProfileTheme,
  metadata: {
    lastUpdated: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    isPublished: false,
    version: 1,
  },
});

export const createDefaultContent = (type: SectionType) => {
  switch (type) {
    case 'about':
      return { text: '', headline: '', specialization: '' } as AboutContent;
    case 'skills':
      return { skills: [] } as SkillContent;
    case 'experience':
      return { positions: [] } as ExperienceContent;
    case 'projects':
      return { projects: [] } as ProjectContent;
    case 'contact':
      return { email: '', socialLinks: [] } as ContactContent;
    case 'mission':
      return { mission: '', values: [] } as MissionContent;
    case 'benefits':
      return { benefits: [] } as BenefitsContent;
    case 'team':
      return { members: [] } as TeamContent;
    case 'culture':
      return { description: '', principles: [] } as CultureContent;
    default:
      throw new Error(`Unknown section type: ${type}`);
  }
};

export const createDefaultProfileData = (): ProfileData => ({
  sections: [],
  theme: DEFAULT_THEME,
  metadata: {
    lastUpdated: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    isPublished: false,
    version: 1,
    isDraft: false,
  },
});

export const isCompanyTemplate = (template: string): template is CompanyTemplate => {
  return ['google', 'microsoft', 'amazon', 'apple', 'modern'].includes(template);
};

export const isSectionType = (type: string): type is SectionType => {
  return [
    'about',
    'contact',
    'skills',
    'experience',
    'projects',
    'mission',
    'benefits',
    'team',
    'culture',
  ].includes(type);
};
