import { Card } from '@/components/ui/card';
import { SectionRendererProps } from '.';
import { isBenefitsContent } from '../../lib/type-guards';

export function BenefitsSection({ section, className }: SectionRendererProps) {
  if (!isBenefitsContent(section.content)) {
    console.error('Invalid benefits section content');
    return null;
  }

  const { content } = section;

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-6">Benefits & Perks</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {content.benefits.map((benefit) => (
          <Card key={benefit.id} className="p-6">
            {benefit.icon && (
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl text-primary">{benefit.icon}</span>
              </div>
            )}
            <h3 className="font-semibold mb-2">{benefit.title}</h3>
            <p className="text-muted-foreground">{benefit.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
