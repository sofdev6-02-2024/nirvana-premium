import { readJobs } from "../lib/job-service";
import Link from "next/link";
import JobSorter from "./job-sorter";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface JobListProps {
  searchParams?: { [key: string]: string | undefined };
}

export default async function JobList({ searchParams = {} }: JobListProps) {
  const page = parseInt(searchParams.page || "1", 10);
  const pageSize = 10;

  const { jobs, hasNextPage } = await readJobs(searchParams, page, pageSize);

  if (jobs.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <h3 className="mt-4 text-lg font-semibold">No jobs found</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            We could not find any jobs matching your criteria. Try adjusting
            your filters or check back later.
          </p>
          <Button variant="outline">
            <Link href="/jobs">Clear filters</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <JobSorter jobs={jobs} />

      <Pagination className="mt-8">
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <Link href={`/jobs?page=${page - 1}`} passHref legacyBehavior>
                <PaginationPrevious />
              </Link>
            </PaginationItem>
          )}

          {page > 2 && (
            <PaginationItem>
              <Link href={`/jobs?page=1`} passHref legacyBehavior>
                <PaginationLink>1</PaginationLink>
              </Link>
            </PaginationItem>
          )}

          {page > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink isActive>{page}</PaginationLink>
          </PaginationItem>

          {hasNextPage && (
            <PaginationItem>
              <Link href={`/jobs?page=${page + 1}`} passHref legacyBehavior>
                <PaginationLink>{page + 1}</PaginationLink>
              </Link>
            </PaginationItem>
          )}

          {hasNextPage && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <Link
                  href={`/jobs?page=${page + 1} pass`}
                  passHref
                  legacyBehavior
                >
                  <PaginationNext />
                </Link>
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </section>
  );
}
