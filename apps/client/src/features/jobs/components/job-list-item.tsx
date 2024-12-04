import Badge from '@/components/badge';
import { Card } from '@/components/ui/card';
import { Developer } from '@/features/developer/types/developer';
import { cn } from '@/lib/utils';
import { Building2, Clock, Code2, Globe, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface DeveloperCardProps {
  developer: Developer;
  className?: string;
}

export default function DeveloperCard({ developer, className }: DeveloperCardProps) {
  return (
    <Link href={`/developers/${developer.id}`}>
      <Card
        className={cn(
          'transition-all hover:shadow-md border-border/50',
          'group relative overflow-hidden',
          className,
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

        <div className="relative flex flex-col sm:flex-row w-full gap-4 sm:gap-5 p-4 sm:p-6">
          <div className="relative flex-shrink-0">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20">
              <Image
                src={developer.profilePictureUrl}
                alt={`${developer.name} ${developer.lastName}`}
                width={80}
                height={80}
                className={cn(
                  'h-full w-full rounded-lg object-cover',
                  'border-2 border-border bg-background',
                  'transition-transform group-hover:scale-105',
                )}
              />
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-foreground truncate">
                    {developer.name} {developer.lastName}
                  </h3>
                  <Badge variant="secondary" className="flex items-center gap-1 h-5 px-2">
                    <span className="text-xs">${developer.salaryPerHourExpected}/hr</span>
                  </Badge>
                </div>
                <div
                  className={cn('flex items-center gap-2 text-sm text-muted-foreground flex-wrap')}
                >
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{developer.specialization.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{developer.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">
                      {developer.yearsOfExperience} years of experience
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-primary/70" />
                <span className="text-sm font-medium">Skills</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {developer.skills.map((skill) => (
                  <Badge key={skill.id} variant="secondary" className="text-xs">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary/70" />
                <span className="text-sm font-medium">Languages</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {developer.spokenLanguages.map((language) => (
                  <Badge key={language.id} variant="outline" className="text-xs">
                    {language.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
