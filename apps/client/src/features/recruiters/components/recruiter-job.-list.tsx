import Link from 'next/link';
import { getJobsByRecruiter } from '../lib/recruiter-service';
import RecruiterJobListItem from './recruiter-job-list-item';

interface RecruiterJobListProps {
  recruiterId: string;
}

export async function RecruiterJobList({ recruiterId }: RecruiterJobListProps) {
  const jobs = await getJobsByRecruiter(recruiterId);

  if (jobs.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="text-muted-foreground">No open positions at the moment</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Link
          key={job.id}
          href={`/jobs/${job.id}`}
          className="block transition-colors hover:bg-accent/5 rounded-lg"
        >
          <RecruiterJobListItem job={job} />
        </Link>
      ))}
    </div>
  );
}
