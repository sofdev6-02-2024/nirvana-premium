import { SectionRendererProps } from '.';
import { isAboutContent } from '../../lib/type-guards';

export function AboutSection({ section, className }: SectionRendererProps) {
  if (!isAboutContent(section.content)) {
    console.error('Invalid about section content');
    return null;
  }

  const { content } = section;

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-4">About Me</h2>
      {content.headline && <p className="text-lg text-muted-foreground mb-4">{content.headline}</p>}
      <div className="prose max-w-none">
        {content.text.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>
      {content.specialization && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <strong>Specialization:</strong> {content.specialization}
        </div>
      )}
    </div>
  );
}
