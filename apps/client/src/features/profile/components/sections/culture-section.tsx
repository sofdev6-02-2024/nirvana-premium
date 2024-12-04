import { Card } from '@/components/ui/card';
import { isCultureContent } from '../../lib/type-guards';
import type { SectionRendererProps } from './index';

export function CultureSection({ section, className }: SectionRendererProps) {
  if (!isCultureContent(section.content)) {
    console.error('Invalid culture section content');
    return null;
  }

  const { content } = section;

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-6">Company Culture</h2>

      <div className="prose max-w-none mb-8">
        <p>{content.description}</p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Our Principles</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {content.principles.map((principle) => (
              <Card key={principle.id} className="p-6">
                <h4 className="font-semibold mb-2">{principle.title}</h4>
                <p className="text-muted-foreground">{principle.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {content.perks && content.perks.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Perks & Benefits</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content.perks.map((perk) => (
                <Card key={perk.id} className="p-6">
                  <h4 className="font-semibold mb-2">{perk.title}</h4>
                  <p className="text-muted-foreground">{perk.description}</p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
