import { SectionType } from './profile';

export type LayoutType = {
  columns: 1 | 2 | 3;
  order: number;
};

export interface ProfileSection {
  id: string;
  type: SectionType;
  content: string;
  layout: LayoutType;
}

export interface ProfileData {
  sections: ProfileSection[];
}

export interface Skill {
  id: string;
  name: string;
}

export interface ProjectContent {
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
  technologies?: string[];
}

export interface ExperienceContent {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface ContactContent {
  email: string;
  phone?: string;
  location?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
}

export interface Benefit {
  title: string;
  description: string;
  icon?: string;
}

export interface CompanyBenefitsContent {
  benefits: Benefit[];
}
