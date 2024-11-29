import { Roles } from '@/types/globals';
import { SectionType } from '../../lib/profile';
import AboutEditor from './about-editor';
import { CompanyBenefitsEditor } from './benefits-editor';
import { ContactEditor } from './contact-editor';
import { ExperienceEditor } from './experience-editor';
import { MissionEditor } from './mission-editor';
import { ProjectsEditor } from './projects-editor';
import { SkillsEditor } from './skills-editor';

interface SectionEditorProps {
  type: SectionType;
  content: string;
  role: Roles;
  onChange: (content: string) => void;
}

export function SectionEditor({ type, content, role, onChange }: SectionEditorProps) {
  const parsedContent = JSON.parse(content);

  const handleChange = (newContent: unknown) => {
    onChange(JSON.stringify(newContent));
  };

  switch (type) {
    case 'about':
      return <AboutEditor content={parsedContent} role={role} onChange={handleChange} />;
    case 'skills':
      return <SkillsEditor content={parsedContent} onChange={handleChange} />;
    case 'experience':
      return <ExperienceEditor content={parsedContent} onChange={handleChange} />;
    case 'projects':
    case 'success-stories':
      return <ProjectsEditor content={parsedContent} role={role} onChange={handleChange} />;
    case 'mission':
      return <MissionEditor content={parsedContent} onChange={handleChange} />;
    case 'contact':
      return <ContactEditor content={parsedContent} onChange={handleChange} />;
    case 'company-benefits':
      return <CompanyBenefitsEditor content={parsedContent} onChange={handleChange} />;
    default:
      return null;
  }
}
