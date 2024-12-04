import { Mail, MapPin, Phone } from 'lucide-react';
import { SectionRendererProps } from '.';
import { isContactContent } from '../../lib/type-guards';
import { SocialIcon } from '../ui/social-icon';

export function ContactSection({ section, className }: SectionRendererProps) {
  if (!isContactContent(section.content)) {
    console.error('Invalid contact section');
    return null;
  }
  const { content } = section;
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-6">Contact</h2>
      <div className="space-y-4">
        {content.email && (
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <a href={`mailto:${content.email}`} className="hover:underline">
              {content.email}
            </a>
          </div>
        )}
        {content.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-muted-foreground" />
            <a href={`tel:${content.phone}`} className="hover:underline">
              {content.phone}
            </a>
          </div>
        )}
        {content.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-muted-foreground" />
            <span>{content.location}</span>
          </div>
        )}
        {content.socialLinks && content.socialLinks?.length > 0 && (
          <div className="flex gap-4 mt-6">
            {content.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <SocialIcon platform={link.platform} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
