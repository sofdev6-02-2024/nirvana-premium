import JobPage from "@/features/jobs/components/job-page";
import RecruiterInfo from "@/features/recruiters/components/recruiter-info";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getJobById, readJobs } from "@/features/jobs/lib/job-service";
import { getRecruiterById } from "@/features/recruiters/lib/recruiter-service";
import { Job } from "@/features/jobs/lib/constants";

interface PageProps {
  params: { id: string };
}

const getJob = cache(async (id: string) => {
  const job = await getJobById(id);
  if (!job) notFound();
  return job;
});

const getRecruiter = cache(async (recruiterId: string) => {
  const recruiter = await getRecruiterById(recruiterId);
  if (!recruiter) notFound();
  return recruiter;
});

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const jobs = await readJobs();
  return jobs.map((job: Job) => ({
    id: job.id,
  }));
}

export async function generateMetadata({
  params: { id },
}: PageProps): Promise<Metadata> {
  const job = await getJob(id);
  return {
    title: `${job.title} | Job Details`,
    description: job.description,
  };
}

export default async function Page({ params: { id } }: PageProps) {
  try {
    const job = await getJob(id);
    const recruiter = job.recruiterId
      ? await getRecruiter(job.recruiterId)
      : null;

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
    console.error("Error rendering job page:", error);
    notFound();
  }
}
