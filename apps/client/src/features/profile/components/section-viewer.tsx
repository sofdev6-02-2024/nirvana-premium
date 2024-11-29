/* eslint-disable @next/next/no-img-element */
import Badge from '@/components/badge';
import { Card } from '@/components/ui/card';
import { Roles } from '@/types/globals';
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import {
  CompanyBenefitsContent,
  ContactContent,
  ExperienceContent,
  ProfileSection,
  ProjectContent,
} from '../lib/types';

interface SectionViewerProps {
  section: ProfileSection;
  role: Roles;
}

export function SectionViewer({ section, role }: SectionViewerProps) {
  const content = JSON.parse(section.content);

  switch (section.type) {
    case 'about':
      return (
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            {role === 'Developer' ? 'About Me' : 'About Company'}
          </h2>
          <div className="prose max-w-none">
            <p>{content.text}</p>
          </div>
        </Card>
      );

    case 'skills':
      return (
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {content.selectedSkills?.map((skill: string) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </Card>
      );
    case 'experience':
      return (
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Experience</h2>
          <div className="space-y-8">
            {content.experiences?.map((exp: ExperienceContent, index: number) => (
              <div key={index} className="border-l-2 border-primary pl-4">
                <h3 className="text-xl font-semibold">{exp.title}</h3>
                <p className="text-muted-foreground">{exp.company}</p>
                <p className="text-sm text-muted-foreground">{exp.period}</p>
                <p className="mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </Card>
      );

    case 'projects':
      return (
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">
            {role === 'Developer' ? 'Projects' : 'Success Stories'}
          </h2>
          <div className="grid gap-6">
            {content.projects?.map((project: ProjectContent, index: number) => (
              <div key={index} className="space-y-4">
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                )}
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>
                {role === 'Developer' && project.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    View {role === 'Developer' ? 'Project' : 'Case Study'}
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </Card>
      );

    case 'contact':
      const contact = content as ContactContent;
      return (
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <div className="space-y-4">
            {contact.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                  {contact.email}
                </a>
              </div>
            )}
            {contact.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
                  {contact.phone}
                </a>
              </div>
            )}
            {contact.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span>{contact.location}</span>
              </div>
            )}
            {contact.socialLinks && contact.socialLinks.length > 0 && (
              <div className="flex gap-4 mt-4">
                {contact.socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        </Card>
      );

    case 'mission':
      return (
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Mission & Values</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-muted-foreground">{content.mission}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Company Culture</h3>
              <p className="text-muted-foreground">{content.culture}</p>
            </div>

            {content.values && content.values.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Our Values</h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  {content.values.map(
                    (value: { title: string; description: string }, index: number) => (
                      <Card key={index} className="p-4">
                        <h4 className="font-semibold mb-2">{value.title}</h4>
                        <p className="text-muted-foreground">{value.description}</p>
                      </Card>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>
      );

    case 'company-benefits':
      const benefitsContent = content as CompanyBenefitsContent;
      return (
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Company Benefits</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {benefitsContent.benefits.map((benefit, index) => (
              <div key={index} className="space-y-2">
                {benefit.icon && (
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="text-xl">{benefit.icon}</span>
                  </div>
                )}
                <h3 className="font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Card>
      );

    case 'success-stories':
    case 'projects':
      const projects = content.projects || [];
      return (
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">
            {section.type === 'projects' ? 'Projects' : 'Success Stories'}
          </h2>
          <div className="grid gap-8">
            {projects.map((item: ProjectContent, index: number) => (
              <div key={index} className="space-y-4">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                )}
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
                {role === 'Developer' && item.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {role === 'Developer' ? 'View Project' : 'Read More'}
                  </a>
                )}
              </div>
            ))}
          </div>
        </Card>
      );

    default:
      return null;
  }
}
