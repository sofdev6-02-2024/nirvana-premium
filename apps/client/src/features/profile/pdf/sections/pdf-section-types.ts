import type {
  AboutContent,
  BenefitsContent,
  ContactContent,
  CultureContent,
  ExperienceContent,
  MissionContent,
  ProjectContent,
  Section,
  SkillContent,
  TeamContent,
} from '../../types';

export interface PDFSectionProps<T> {
  content: T;
}

export type PDFAboutSectionProps = PDFSectionProps<AboutContent>;
export type PDFSkillsSectionProps = PDFSectionProps<SkillContent>;
export type PDFExperienceSectionProps = PDFSectionProps<ExperienceContent>;
export type PDFProjectsSectionProps = PDFSectionProps<ProjectContent>;
export type PDFContactSectionProps = PDFSectionProps<ContactContent>;
export type PDFMissionSectionProps = PDFSectionProps<MissionContent>;
export type PDFBenefitsSectionProps = PDFSectionProps<BenefitsContent>;
export type PDFTeamSectionProps = PDFSectionProps<TeamContent>;
export type PDFCultureSectionProps = PDFSectionProps<CultureContent>;

export function isAboutSection(section: Section): section is Section & { content: AboutContent } {
  return section.type === 'about';
}

export function isSkillsSection(section: Section): section is Section & { content: SkillContent } {
  return section.type === 'skills';
}

export function isExperienceSection(
  section: Section,
): section is Section & { content: ExperienceContent } {
  return section.type === 'experience';
}

export function isProjectsSection(
  section: Section,
): section is Section & { content: ProjectContent } {
  return section.type === 'projects';
}

export function isContactSection(
  section: Section,
): section is Section & { content: ContactContent } {
  return section.type === 'contact';
}

export function isMissionSection(
  section: Section,
): section is Section & { content: MissionContent } {
  return section.type === 'mission';
}

export function isBenefitsSection(
  section: Section,
): section is Section & { content: BenefitsContent } {
  return section.type === 'benefits';
}

export function isTeamSection(section: Section): section is Section & { content: TeamContent } {
  return section.type === 'team';
}

export function isCultureSection(
  section: Section,
): section is Section & { content: CultureContent } {
  return section.type === 'culture';
}
