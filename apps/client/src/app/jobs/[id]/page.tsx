import JobPage from "@/features/jobs/components/job-page";
import RecruiterInfo from "@/features/recruiters/components/recruiter-info";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getJobById } from "@/features/jobs/lib/job-service";
import { getRecruiterById } from "@/features/recruiters/lib/recruiter-service";
import { getServerSession } from "next-auth/next";

interface PageProps {
  params: { id: string };
}

const getRecruiter = cache(async (recruiterId: string, token: string) => {
  const session = await getServerSession();
  const recruiter = await getRecruiterById(recruiterId, token);
  if (!recruiter) notFound();
  return recruiter;
});

export async function generateMetadata({
  params: { id },
}: PageProps): Promise<Metadata> {
  const session = await getServerSession();
  const token = session?.access_token;

  // if (!token) {
  //   redirect("/api/auth/signin");
  // }

  const job = await getJob(id, token);
  return { title: job.title };
}

const getJob = cache(async (id: string, token: string) => {
  const job = await getJobById(id, token);
  if (!job) notFound();
  return job;
});

export default async function Page({ params: { id } }: PageProps) {
  const session = await getServerSession();
  const token = session?.access_token;

  // if (!token) {
  //   redirect(
  //     "/api/auth/signin?callbackUrl=" + encodeURIComponent(`/jobs/${id}`),
  //   );
  // }

  const job = await getJob(id, token);
  const recruiter = job.recruiterId
    ? await getRecruiter(job.recruiterId, token)
    : null;

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      {recruiter && (
        <aside className="mt-8">
          <RecruiterInfo recruiter={recruiter} />
        </aside>
      )}
    </main>
  );
}
