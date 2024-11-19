// components/JobListItem.tsx
import defaultImage from '@/assets/company-logo-placeholder.png';
import Badge from '@/components/badge';
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
    <Card className={cn('group transition-all hover:shadow-md', className)}>
      <div className={cn('flex w-full items-start gap-5 p-6')}>
        <Image
          src={defaultImage || job.recruiterLogo}
          alt={`${job.title} company logo`}
          width={130}
          height={130}
          className={cn('rounded-xl border border-border bg-background shadow-sm')}
        />

        <div className={cn('flex-grow space-y-3')}>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className={cn('text-xl font-bold text-foreground')}>{job.title}</h2>
              <Badge variant={job.status === 'Open' ? 'success' : 'secondary'}>{job.status}</Badge>
            </div>

            <div className={cn('flex flex-wrap items-center gap-3 text-sm text-muted-foreground')}>
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                <span>{job.schedule}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <Badge variant="secondary">{job.modality}</Badge>
            </div>
          </div>

          <p className={cn('line-clamp-2 text-muted-foreground')}>{job.description}</p>

          <div className={cn('flex items-center justify-between')}>
            <div className={cn('flex items-center gap-2 text-muted-foreground')}>
              <Banknote className="h-4 w-4" />
              <span>{formatMoney(job.salaryPerHour)} / hour</span>
            </div>

            <div className={cn('flex items-center gap-2 text-sm text-muted-foreground')}>
              <Clock className="h-4 w-4" />
              <span>Posted {relativeDate(new Date(job.createdAt))}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
