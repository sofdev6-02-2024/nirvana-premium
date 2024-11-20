import { JobFilters } from '@/features/jobs/components/job-filters';
import JobList from '@/features/jobs/components/job-list';
import { JobListSkeleton } from '@/features/jobs/components/job-list-skeleton';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Developer Jobs | Find Your Next Role',
  description: 'Browse and apply for the latest developer jobs across all experience levels.',
};

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <main className="mx-auto my-10 max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Developer Jobs Board</h1>
        <p className="text-lg text-muted-foreground">
          Find your next developer role from our curated list of opportunities
        </p>
      </div>

      <JobFilters />

      <Suspense fallback={<JobListSkeleton />}>
        <JobList searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
