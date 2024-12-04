import { Roles } from '@/types/globals';
import { SectionContent } from './content';

export type CommonSectionType = 'about' | 'contact';
export type DeveloperSectionType = 'skills' | 'experience' | 'projects';
export type RecruiterSectionType = 'mission' | 'benefits' | 'team' | 'culture';

export type SectionType = CommonSectionType | DeveloperSectionType | RecruiterSectionType;

export interface Section {
  id: string;
  type: SectionType;
  content: SectionContent;
  layout: {
    columns: 1 | 2 | 3;
    order: number;
  };
}

export interface SectionConstraints {
  max: number;
  required: boolean;
  allowedColumns: (1 | 2 | 3)[];
  allowedLayouts: Array<{
    spacing: 'compact' | 'comfortable' | 'spacious';
    style: 'card' | 'minimal' | 'flat';
  }>;
}

export const getSectionsByRole = (role: Roles): SectionType[] => {
  const commonSections: SectionType[] = ['about', 'contact'];

  if (role === 'developer') {
    return [...commonSections, 'skills', 'experience', 'projects'];
  }

  return [...commonSections, 'mission', 'benefits', 'team', 'culture'];
};

export const SECTION_CONSTRAINTS: Record<
  SectionType,
  {
    max: number;
    required: boolean;
    allowedColumns: (1 | 2 | 3)[];
  }
> = {
  about: {
    max: 1,
    required: true,
    allowedColumns: [1],
  },
  contact: {
    max: 1,
    required: true,
    allowedColumns: [1],
  },
  skills: {
    max: 1,
    required: true,
    allowedColumns: [1, 2, 3],
  },
  experience: {
    max: 1,
    required: true,
    allowedColumns: [1],
  },
  projects: {
    max: 1,
    required: false,
    allowedColumns: [1, 2],
  },
  mission: {
    max: 1,
    required: true,
    allowedColumns: [1],
  },
  benefits: {
    max: 1,
    required: false,
    allowedColumns: [1, 2, 3],
  },
  team: {
    max: 1,
    required: false,
    allowedColumns: [1, 2, 3],
  },
  culture: {
    max: 1,
    required: false,
    allowedColumns: [1],
  },
};

export const validateSectionConfig = (type: SectionType, columns: number): boolean => {
  const constraint = SECTION_CONSTRAINTS[type];
  return constraint.allowedColumns.includes(columns as 1 | 2 | 3);
};
