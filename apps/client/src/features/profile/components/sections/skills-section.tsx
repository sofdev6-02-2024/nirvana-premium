import Badge from '@/components/badge';
import { SectionRendererProps } from '.';
import { isSkillContent } from '../../lib/type-guards';

export function SkillsSection({ section, className }: SectionRendererProps) {
  if (!isSkillContent(section.content)) {
    console.error('Invalid project section content');
    return null;
  }

  const { content } = section;

  if (content.categories?.length) {
    return (
      <div className={className}>
        <h2 className="text-2xl font-bold mb-6">Skills</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {content.categories.map((category) => (
            <div key={category.name} className="space-y-3">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skillId) => {
                  const skill = content.skills.find((s) => s.id === skillId);
                  return skill ? (
                    <Badge key={skill.id} variant="secondary" className="flex items-center gap-2">
                      {skill.name}
                      {skill.level && <span className="text-xs opacity-70">{skill.level}</span>}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-6">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {content.skills.map((skill) => (
          <Badge key={skill.id} variant="secondary" className="flex items-center gap-2">
            {skill.name}
            {skill.level && <span className="text-xs opacity-70">{skill.level}</span>}
          </Badge>
        ))}
      </div>
    </div>
  );
}
