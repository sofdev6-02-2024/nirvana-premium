import { JobListSkeleton } from '@/features/jobs/components/job-list-skeleton';
import { RecruiterDetailHeader } from '@/features/recruiters/components/recruiter-header';
import { RecruiterJobList } from '@/features/recruiters/components/recruiter-job.-list';
import { getRecruiterById } from '@/features/recruiters/lib/recruiter-service';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface Props {
  params: { id: string };
}

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    const recruiter = await getRecruiterById(params.id);
    if (!recruiter) return { title: 'Recruiter Not Found' };

    return {
      title: `${recruiter.name} | Developer Jobs`,
    };
  } catch {
    return {
      title: 'Recruiter Not Found',
      description: 'The requested recruiter could not be found.',
    };
  }
}

export default async function RecruiterDetailPage({ params }: Props) {
  try {
    const recruiter = await getRecruiterById(params.id);
    if (!recruiter) notFound();

    return (
      <div className="min-h-[calc(100vh-4rem)] bg-muted/10">
        <main className="container py-8 lg:py-12">
          <div className="mx-auto max-w-5xl">
            <RecruiterDetailHeader recruiter={recruiter} />

            <div className="mt-10 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Open Positions</h2>
                <span className="text-sm text-muted-foreground">Showing 0 positions</span>
              </div>

              <Suspense
                fallback={
                  <div className="space-y-4">
                    <JobListSkeleton />
                  </div>
                }
              >
                <RecruiterJobList recruiterId={recruiter.id} />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error rendering recruiter page:', error);
    notFound();
  }
}
