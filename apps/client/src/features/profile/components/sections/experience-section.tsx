import Badge from '@/components/badge';
import { SectionRendererProps } from '.';
import { isExperienceContent } from '../../lib/type-guards';

export function ExperienceSection({ section, className }: SectionRendererProps) {
  if (!isExperienceContent(section.content)) {
    console.error('Invalid experience section content');
    return null;
  }

  const { content } = section;

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-6">Experience</h2>
      <div className="space-y-8">
        {content.positions.map((position) => (
          <div key={position.id} className="border-l-2 border-primary pl-4">
            <h3 className="text-xl font-semibold">{position.title}</h3>
            <p className="text-muted-foreground">
              {position.company}
              {position.location && ` • ${position.location}`}
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              {position.startDate} - {position.current ? 'Present' : position.endDate}
            </p>
            <div className="prose max-w-none mt-2">
              <p>{position.description}</p>
            </div>
            {position.achievements && position.achievements.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Key Achievements</h4>
                <ul className="list-disc list-inside space-y-1">
                  {position.achievements.map((achievement, index) => (
                    <li key={`${position.id}-achievement-${index}`}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
            {position.technologies && position.technologies.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {position.technologies.map((tech, index) => (
                  <Badge key={`${position.id}-tech-${index}`} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
