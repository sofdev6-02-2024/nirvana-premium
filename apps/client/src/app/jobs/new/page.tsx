import { JobPostFormWrapper } from '@/features/jobs/components/job-post-form-wrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Post New Job',
  description: 'Create a new job posting',
};

export default function NewJobPage() {
  return (
    <main className="mx-auto my-10 max-w-3xl space-y-8 px-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Post a New Job</h1>
        <p className="text-muted-foreground">Create a new job posting for your company</p>
      </div>
      <JobPostFormWrapper />
    </main>
  );
}
