import { Job } from "@/features/jobs/lib/constants";
import JobListItem from "@/features/jobs/components/job-list-item";
import { Metadata } from "next";
import Link from "next/link";
import { readJobs } from "@/features/jobs/lib/job-service";

export const metadata: Metadata = {
  title: "All Jobs",
};

export default async function JobsPage() {
  const jobs: Job[] = await readJobs();

  return (
    <main className="mx-auto my-10 max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Your Next Career Move
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover exciting job opportunities and apply today to jumpstart your
          career.
        </p>
      </div>
      <section className="space-y-6">
        <div className="space-y-4">
          {jobs.map((job) => (
            <Link key={job.id} href={`/jobs/${job.id}`} className="block">
              <JobListItem job={job} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
