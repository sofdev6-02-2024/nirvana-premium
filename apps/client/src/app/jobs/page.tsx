import { Job } from "@/lib/types";
import JobListItem from "@/components/JobListItem";
import { Metadata } from "next";
import Link from "next/link";
import { getAllJobs } from "@/lib/jobUtils";

export const metadata: Metadata = {
  title: "All Jobs",
};

export default async function JobsPage() {
  const jobs: Job[] = await getAllJobs();

  return (
    <main className="max-w-5xl m-auto px-3 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Tu Primera Chamba
        </h1>
        <p>Work if you dont want to die, or if you want to eat something.</p>
      </div>
      <section>
        <div className="space-y-4">
          {jobs.map((job) => (
            <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
              <JobListItem job={job} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
