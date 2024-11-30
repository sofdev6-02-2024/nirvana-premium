import Badge from '@/components/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Job } from '@/features/jobs/lib/constants';
import { cn, formatMoney, relativeDate } from '@/lib/utils';
import { Banknote, Building2, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';

interface JobListItemProps {
  job: Job;
  className?: string;
}

export default function JobListItem({ job, className }: JobListItemProps) {
  return (
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
              src={job.recruiterLogo}
              alt={`${job.title} company logo`}
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
                <h3 className="font-semibold text-foreground truncate">{job.title}</h3>
                <Badge
                  variant={job.status === 'Open' ? 'success' : 'secondary'}
                  className="flex items-center gap-1 h-5 px-2"
                >
                  <span className="text-xs">{job.status}</span>
                </Badge>
              </div>
              <div className={cn('flex items-center gap-2 text-sm text-muted-foreground')}>
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{job.schedule}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground hidden sm:block">
                {formatMoney(job.salaryPerHour)} / hour
              </span>
              <Badge variant="secondary" className="hidden sm:flex">
                {job.modality}
              </Badge>
            </div>
          </div>

          <div className={cn('flex flex-wrap gap-2 pt-1')}>
            <Button variant="outline" size="sm" className="h-9 flex-1 sm:flex-none">
              View Job Details
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground sm:hidden w-full">
              <Banknote className="h-4 w-4 flex-shrink-0" />
              <span>{formatMoney(job.salaryPerHour)} / hour</span>
              <Clock className="h-4 w-4 flex-shrink-0 ml-3" />
              <span>Posted {relativeDate(new Date(job.createdAt))}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground mt-2 hidden sm:flex">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary/70" />
              <span>Posted {relativeDate(new Date(job.createdAt))}</span>
            </div>
            <Badge variant="secondary">{job.modality}</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
