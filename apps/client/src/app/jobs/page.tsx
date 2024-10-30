import { Job } from "@/features/jobs/lib/constants";
import JobListItem from "@/features/jobs/components/job-list-item";
import { Metadata } from "next";
import Link from "next/link";
import { getAllJobs } from "@/features/jobs/lib/job-service";

export const metadata: Metadata = {
  title: "All Jobs",
};

export default async function JobsPage() {
  const jobs: Job[] = await getAllJobs();

  return (
    <main className="mx-auto my-10 max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Tu Primera Chamba
        </h1>
        <p className="text-lg text-muted-foreground">
          Work if you dont want to die, or if you want to eat something.
        </p>
      </div>
      <section className="space-y-6">
        <div className="space-y-4">
          {jobs.map((job) => (
            <Link key={job.slug} href={`/jobs/${job.slug}`} className="block">
              <JobListItem job={job} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}