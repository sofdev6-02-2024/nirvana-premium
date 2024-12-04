export interface SectionEditorProps<T = unknown> {
  content: T;
  onChange: (content: T) => void;
}

export { AboutEditor } from './about.editor';
export { BenefitsEditor } from './benefits-editor';
export { ContactEditor } from './contact-editor';
export { CultureEditor } from './culture-editor';
export { ExperienceEditor } from './experience-editor';
export { MissionEditor } from './mission-editor';
export { ProjectsEditor } from './projects-editor';
export { SkillsEditor } from './skills-editor';
export { TeamEditor } from './team-editor';
