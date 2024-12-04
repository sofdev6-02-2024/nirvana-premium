import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { isTeamContent } from '../../lib/type-guards';
import type { SectionRendererProps } from './index';

export function TeamSection({ section, className }: SectionRendererProps) {
  if (!isTeamContent(section.content)) {
    console.error('Invalid team section content');
    return null;
  }

  const { content } = section;

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-6">Our Team</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {content.members.map((member) => (
          <Card key={member.id} className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                {member.imageUrl ? (
                  <AvatarImage src={member.imageUrl} alt={member.name} />
                ) : (
                  <AvatarFallback>
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                )}
              </Avatar>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-muted-foreground mb-4">{member.position}</p>
              {member.description && (
                <p className="text-sm text-muted-foreground">{member.description}</p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
