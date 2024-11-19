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
      <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
        <div className="w-full md:flex-1">
          <JobPage job={job} />
          <div className="mt-4 flex justify-center md:justify-start">
            <Button asChild>
              <a href={applicationLink} className="w-40 md:w-fit">
                Apply now
              </a>
            </Button>
          </div>
        </div>

        {recruiter && (
          <aside className="mt-8 w-full md:sticky md:top-4 md:mt-0 md:w-80">
            <RecruiterInfo recruiter={recruiter} />
          </aside>
        )}
      </main>
    );
  } catch (error) {
    console.error('Error rendering job page:', error);
    notFound();
  }
}
