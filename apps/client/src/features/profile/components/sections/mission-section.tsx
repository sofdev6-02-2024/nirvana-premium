import { Card } from '@/components/ui/card';
import { SectionRendererProps } from '.';
import { isMissionContent } from '../../lib/type-guards';

export function MissionSection({ section, className }: SectionRendererProps) {
  if (!isMissionContent(section.content)) {
    console.error('Invalid mission section content');
    return null;
  }

  const { content } = section;

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-6">Our Mission & Values</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-3">Mission</h3>
          <p className="text-muted-foreground">{content.mission}</p>
        </div>

        {content.vision && (
          <div>
            <h3 className="text-xl font-semibold mb-3">Vision</h3>
            <p className="text-muted-foreground">{content.vision}</p>
          </div>
        )}

        <div>
          <h3 className="text-xl font-semibold mb-4">Our Values</h3>
          <div className="grid gap-6 sm:grid-cols-2">
            {content.values.map((value) => (
              <Card key={value.id} className="p-4">
                <h4 className="font-semibold mb-2">{value.title}</h4>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
