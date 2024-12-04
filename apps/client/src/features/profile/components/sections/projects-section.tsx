import Badge from '@/components/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { SectionRendererProps } from '.';
import { isProjectContent } from '../../lib/type-guards';

export function ProjectsSection({ section, className }: SectionRendererProps) {
  if (!isProjectContent(section.content)) {
    console.error('Invalid project section content');
    return null;
  }

  const { content } = section;

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {content.projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            {project.imageUrl && (
              <div className="aspect-video relative overflow-hidden">
                <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              {project.highlights && project.highlights.length > 0 && (
                <ul className="list-disc list-inside mb-4 space-y-1">
                  {project.highlights.map((highlight, index) => (
                    <li key={`${project.id}-highlight-${index}`}>{highlight}</li>
                  ))}
                </ul>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <Badge key={`${project.id}-tech-${index}`} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
              {project.link && (
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
