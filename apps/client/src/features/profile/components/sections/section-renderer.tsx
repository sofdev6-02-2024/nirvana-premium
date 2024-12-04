import { cn } from '@/lib/utils';
import { Roles } from '@/types/globals';
import { createSectionStyles } from '../../lib/common-styles';
import { ProfileTheme, Section, SectionType } from '../../types';
import { AboutSection } from './about-section';
import { BenefitsSection } from './benefits-section';
import { ContactSection } from './contact-section';
import { CultureSection } from './culture-section';
import { ExperienceSection } from './experience-section';
import { MissionSection } from './mission-section';
import { ProjectsSection } from './projects-section';
import { SkillsSection } from './skills-section';
import { TeamSection } from './team-section';

export interface SectionRendererProps {
  section: Section;
  className?: string;
  role: Roles;
  theme: ProfileTheme;
}

const SECTION_RENDERERS: Record<SectionType, React.ComponentType<SectionRendererProps>> = {
  about: AboutSection,
  contact: ContactSection,

  skills: SkillsSection,
  experience: ExperienceSection,
  projects: ProjectsSection,

  mission: MissionSection,
  benefits: BenefitsSection,
  team: TeamSection,
  culture: CultureSection,
};

export function SectionRenderer({ section, className, role, theme }: SectionRendererProps) {
  const Renderer = SECTION_RENDERERS[section.type];
  if (!Renderer) {
    console.error(`No renderer found for section type: ${section.type}`);
    return null;
  }

  const styles = createSectionStyles(theme);

  return (
    <div className={cn('transition-all duration-300', className)} style={styles.container}>
      <Renderer section={section} role={role} theme={theme} className={className} />
    </div>
  );
}

export function getAvailableSections(role: Roles): SectionType[] {
  const commonSections: SectionType[] = ['about', 'contact'];

  if (role === 'developer') {
    return [...commonSections, 'skills', 'experience', 'projects'];
  }
  return [...commonSections, 'mission', 'benefits', 'team', 'culture'];
}

export function isSectionValidForRole(type: SectionType, role: Roles): boolean {
  return getAvailableSections(role).includes(type);
}
