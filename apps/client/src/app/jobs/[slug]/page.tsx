import JobPage from "@/components/JobPage";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getJobBySlug, getAllJobs } from "@/lib/jobUtils";
import { Job } from "@/lib/types";

interface PageProps {
  params: { slug: string };
}

const getJob = cache(async (slug: string) => {
  const job = await getJobBySlug(slug);

  if (!job) notFound();

  return job;
});

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const jobs = await getAllJobs();
  return jobs.map(({ slug }: Job) => ({ slug }));
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const job = await getJob(slug);

  return {
    title: job.title,
  };
}

export default async function Page({ params: { slug } }: PageProps) {
  const job = await getJob(slug);

  const { applicationEmail, applicationUrl } = job;

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    console.error("Job has no application link or email");
    notFound();
  }

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      <aside>
        <Button asChild>
          <a href={applicationLink} className="w-40 md:w-fit">
            Apply now
          </a>
        </Button>
      </aside>
    </main>
  );
}
