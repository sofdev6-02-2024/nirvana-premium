import Badge from '@/components/badge';
import { Building2, Clock, Code2, Globe, Link as LinkIcon, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Developer } from '../types/developer';

interface DeveloperProfileProps {
  developer: Developer;
}

export function DeveloperProfile({ developer }: DeveloperProfileProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Image */}
        <div className="relative h-32 w-32 md:h-40 md:w-40 flex-shrink-0">
          <Image
            src={developer.profilePictureUrl}
            alt={`${developer.name} ${developer.lastName}`}
            width={160}
            height={160}
            className="rounded-lg object-cover h-full w-full border-2 border-border"
          />
        </div>

        {/* Basic Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-2xl font-bold">
              {developer.name} {developer.lastName}
            </h1>
            <p className="text-muted-foreground">{developer.specialization.name}</p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{developer.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{developer.yearsOfExperience} years of experience</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>${developer.salaryPerHourExpected}/hour</span>
            </div>
            {developer.portfolioUrl && (
              <Link
                href={developer.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <LinkIcon className="h-4 w-4" />
                <span>Portfolio</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Skills Section */}
      {developer.skills.length > 0 && (
        <div className="space-y-2 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Skills</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {developer.skills.map((skill) => (
              <Badge key={skill.id} variant="secondary">
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Languages Section */}
      {developer.spokenLanguages.length > 0 && (
        <div className="space-y-2 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Spoken Languages</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {developer.spokenLanguages.map((language) => (
              <Badge key={language.id} variant="outline">
                {language.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
