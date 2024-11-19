import JobListItem from '@/features/jobs/components/job-list-item';
import { getJobsByRecruiter } from '../lib/recruiter-service';

interface RecruiterJobListProps {
  recruiterId: string;
}

export async function RecruiterJobList({ recruiterId }: RecruiterJobListProps) {
  const jobs = await getJobsByRecruiter(recruiterId);

  if (jobs.length === 0) {
    return <div className="text-center text-muted-foreground">No open positions at this time.</div>;
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobListItem key={job.id} job={job} />
      ))}
    </div>
  );
}
