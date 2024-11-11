import { readJobs } from "../lib/job-service";
import Link from "next/link";
import JobSorter from "./job-sorter";
import JobListItem from "./job-list-item";
import { Button } from "@/components/ui/button";
import { JobPagination } from "./job-pagination";

interface JobListProps {
  searchParams?: { [key: string]: string | undefined };
}

export default async function JobList({ searchParams = {} }: JobListProps) {
  const page = parseInt(searchParams.page || "1", 10);
  const pageSize = 10;

  const { jobs, hasNextPage, hasPreviousPage, totalCount } = await readJobs(
    searchParams,
    page,
    pageSize,
  );

  if (jobs.length === 0) {
    return (
      <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <h3 className="mt-4 text-lg font-semibold">No jobs found</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            We couldn't find any jobs matching your criteria. Try adjusting your
            filters or check back later.
          </p>
          <Button variant="outline" asChild>
            <Link href="/jobs">Clear filters</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex w-full items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">{jobs.length}</span> of{" "}
          <span className="font-medium text-foreground">{totalCount}</span> jobs
        </p>
        <JobSorter jobs={jobs} />
      </div>

      <div className="mb-8 flex w-full flex-col space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="w-full">
            <Link href={`/jobs/${job.id}`}>
              <JobListItem job={job} />
            </Link>
          </div>
        ))}
      </div>

      {totalCount > pageSize && (
        <div className="mt-6 flex w-full justify-center">
          <JobPagination
            currentPage={page}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            totalCount={totalCount}
            pageSize={pageSize}
          />
        </div>
      )}
    </div>
  );
}
