export interface AboutContent {
  text: string;
  headline?: string;
  specialization?: string;
}

export interface SkillContent {
  skills: Array<{
    id: string;
    name: string;
    level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  }>;
  categories?: Array<{
    name: string;
    skills: string[];
  }>;
}

export interface ExperienceContent {
  positions: Array<{
    id: string;
    title: string;
    company: string;
    location?: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
    achievements?: string[];
    technologies?: string[];
  }>;
}

export interface ProjectContent {
  projects: Array<{
    id: string;
    title: string;
    description: string;
    technologies?: string[];
    link?: string;
    imageUrl?: string;
    highlights?: string[];
  }>;
}

export interface ContactContent {
  email: string;
  phone?: string;
  location?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
}

export interface BenefitsContent {
  benefits: Array<{
    id: string;
    title: string;
    description: string;
    icon?: string;
  }>;
}

export interface MissionContent {
  mission: string;
  vision?: string;
  values: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

export interface TeamContent {
  members: Array<{
    id: string;
    name: string;
    position: string;
    imageUrl?: string;
    description?: string;
  }>;
}

export interface CultureContent {
  description: string;
  principles: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  perks?: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

export type SectionContent =
  | AboutContent
  | SkillContent
  | ExperienceContent
  | ProjectContent
  | ContactContent
  | BenefitsContent
  | MissionContent
  | TeamContent
  | CultureContent;

export type SectionContentMap = {
  about: AboutContent;
  skills: SkillContent;
  experience: ExperienceContent;
  projects: ProjectContent;
  contact: ContactContent;
  mission: MissionContent;
  benefits: BenefitsContent;
  team: TeamContent;
  culture: CultureContent;
};
