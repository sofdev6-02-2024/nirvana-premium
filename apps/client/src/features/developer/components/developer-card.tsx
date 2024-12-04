import Badge from '@/components/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Briefcase, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Developer } from '../types/developer';

interface DeveloperCardProps {
  developer: Developer;
}

export function DeveloperCard({ developer }: DeveloperCardProps) {
  return (
    <Link href={`/developers/${developer.id}`} className="block">
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-start gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={developer.profilePictureUrl}
              alt={`${developer.name} ${developer.lastName}`}
            />
            <AvatarFallback>
              {developer.name[0]}
              {developer.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">
                {developer.name} {developer.lastName}
              </h3>
              <Badge className="text-xs">${developer.salaryPerHourExpected}/hr</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{developer.specialization.name}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{developer.location}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{developer.yearsOfExperience} years experience</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Skills</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {developer.skills.slice(0, 4).map((skill) => (
                <Badge key={skill.id} variant="secondary" className="text-xs">
                  Me la pelas
                </Badge>
              ))}
              {developer.skills.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{developer.skills.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
