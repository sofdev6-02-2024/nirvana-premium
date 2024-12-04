import type {
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

export function isAboutContent(content: unknown): content is AboutContent {
  const c = content as AboutContent;
  return typeof c === 'object' && c !== null && 'text' in c;
}

export function isSkillContent(content: unknown): content is SkillContent {
  const c = content as SkillContent;
  return typeof c === 'object' && c !== null && Array.isArray(c.skills);
}

export function isExperienceContent(content: unknown): content is ExperienceContent {
  const c = content as ExperienceContent;
  return typeof c === 'object' && c !== null && Array.isArray(c.positions);
}

export function isProjectContent(content: unknown): content is ProjectContent {
  const c = content as ProjectContent;
  return typeof c === 'object' && c !== null && Array.isArray(c.projects);
}

export function isContactContent(content: unknown): content is ContactContent {
  const c = content as ContactContent;
  return typeof c === 'object' && c !== null && typeof c.email === 'string';
}

export function isBenefitsContent(content: unknown): content is BenefitsContent {
  const c = content as BenefitsContent;
  return typeof c === 'object' && c !== null && Array.isArray(c.benefits);
}

export function isMissionContent(content: unknown): content is MissionContent {
  const c = content as MissionContent;
  return (
    typeof c === 'object' && c !== null && typeof c.mission === 'string' && Array.isArray(c.values)
  );
}

export function isTeamContent(content: unknown): content is TeamContent {
  const c = content as TeamContent;
  return typeof c === 'object' && c !== null && Array.isArray(c.members);
}

export function isCultureContent(content: unknown): content is CultureContent {
  const c = content as CultureContent;
  return (
    typeof c === 'object' &&
    c !== null &&
    typeof c.description === 'string' &&
    Array.isArray(c.principles)
  );
}
