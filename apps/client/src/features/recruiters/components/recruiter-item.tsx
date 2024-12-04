import Badge from '@/components/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CheckCircle, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Recruiter } from '../lib/constant';

interface RecruiterListItemProps {
  recruiter: Recruiter;
  className?: string;
}

export function RecruiterListItem({
  recruiter: { id, name, location, profilePictureUrl, isVerified },
  className,
}: RecruiterListItemProps) {
  return (
    <Card
      className={cn(
        'transition-all hover:shadow-md border-border/50',
        'group relative overflow-hidden',
        className,
      )}
    >
      <Link href={`/recruiters/${id}`} className="block">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="relative flex flex-col sm:flex-row items-start gap-4 p-4 sm:p-6">
          <div className="relative flex-shrink-0">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20">
              <Image
                src={profilePictureUrl}
                alt={`${name}'s profile picture`}
                width={80}
                height={80}
                className={cn(
                  'h-full w-full rounded-lg object-cover',
                  'border-2 border-border bg-background',
                  'transition-transform group-hover:scale-105',
                )}
              />
              {isVerified && (
                <div className="absolute -right-2 -top-2 rounded-full border-2 border-background bg-background p-0.5">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
              )}
            </div>
          </div>
          <div className={cn('flex-1 min-w-0 space-y-3')}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-foreground truncate">{name}</h3>
                  <Badge
                    variant={isVerified ? 'success' : 'secondary'}
                    className={cn('flex items-center gap-1 h-5 px-2')}
                  >
                    {isVerified ? (
                      <>
                        <CheckCircle className="h-3 w-3" />
                        <span className="text-xs">Verified</span>
                      </>
                    ) : (
                      <span className="text-xs">Not Verified</span>
                    )}
                  </Badge>
                </div>
                <div className={cn('flex items-center gap-2 text-sm text-muted-foreground')}>
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
