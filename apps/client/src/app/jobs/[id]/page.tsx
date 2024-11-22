import { Button } from '@/components/ui/button';
import JobPage from '@/features/jobs/components/job-page';
import { getJobById } from '@/features/jobs/lib/job-service';
import RecruiterInfo from '@/features/recruiters/components/recruiter-info';
import { getRecruiterById } from '@/features/recruiters/lib/recruiter-service';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    const job = await getJobById(params.id);

    return {
      title: `${job.title} | Developer Jobs`,
      description: job.description,
    };
  } catch {
    return {
      title: 'Job Not Found',
      description: 'The requested job posting could not be found.',
    };
  }
}

export default async function Page({ params }: Props) {
  try {
    const job = await getJobById(params.id);
    const recruiter = job.recruiterId ? await getRecruiterById(job.recruiterId) : null;
    const applicationLink = `/api/apply/${job.id}`;

    return (
      <div className="min-h-[calc(100vh-4rem)] bg-muted/10">
        <main className="container py-6 lg:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
            {/* Main Content */}
            <div className="flex-1 space-y-6">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <JobPage job={job} />
                <div className="mt-6 flex justify-center border-t pt-6 lg:justify-start">
                  <Button size="lg" className="w-full sm:w-auto">
                    <a href={applicationLink} className="flex items-center justify-center gap-2">
                      Apply now
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            {recruiter && (
              <div className="lg:w-[350px]">
                <div className="lg:sticky lg:top-6">
                  <RecruiterInfo recruiter={recruiter} />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error rendering job page:', error);
    notFound();
  }
}
