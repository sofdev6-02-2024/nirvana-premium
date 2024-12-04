import Badge from '@/components/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Job } from '@/features/jobs/lib/constants';
import { cn, formatMoney, relativeDate } from '@/lib/utils';
import { Banknote, Building2, Clock, MapPin } from 'lucide-react';

interface JobListItemProps {
  job: Job;
  className?: string;
}

export default function RecruiterJobListItem({ job, className }: JobListItemProps) {
  return (
    <Card
      className={cn(
        'transition-all hover:shadow-md border-border/50',
        'group relative overflow-hidden',
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative flex flex-col w-full p-4 sm:p-6 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 flex-grow">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-foreground truncate text-lg sm:text-xl">
                {job.title}
              </h3>
              <Badge
                variant={job.status === 'Open' ? 'success' : 'secondary'}
                className="flex items-center gap-1 h-5 px-2"
              >
                <span className="text-xs">{job.status}</span>
              </Badge>
            </div>

            <div className={cn('flex flex-wrap gap-2 sm:gap-3 text-sm text-muted-foreground')}>
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4 flex-shrink-0" />
                <span>{job.schedule}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>{job.location}</span>
              </div>
              <Badge variant="secondary" className="flex-shrink-0">
                {job.modality}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2 hidden sm:flex">
            <span className="text-sm font-medium text-muted-foreground">
              {formatMoney(job.salaryPerHour)} / hour
            </span>
          </div>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">{job.description}</p>

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
            <Banknote className="h-4 w-4 flex-shrink-0" />
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span>Posted {relativeDate(new Date(job.createdAt))}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
