import { readJobs } from "../lib/job-service";
import Link from "next/link";
import JobListItem from "./job-list-item";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface JobListProps {
  searchParams?: { [key: string]: string | undefined };
}

export default async function JobList({ searchParams = {} }: JobListProps) {
  const page = parseInt(searchParams.page || "1", 10);
  const pageSize = 5;

  const { jobs, hasNextPage, totalCount } = await readJobs(
    searchParams,
    page,
    pageSize,
  );

  if (jobs.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
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

  const createPageUrl = (pageNum: number) => {
    const params = new URLSearchParams();

    // Preserve all current search params
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== "page" && value) {
        params.set(key, value);
      }
    });

    params.set("page", pageNum.toString());
    return `/jobs?${params.toString()}`;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{jobs.length}</span> of{" "}
          <span className="font-medium">{totalCount}</span> jobs
        </p>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Link key={job.id} href={`/jobs/${job.id}`} className="block">
            <JobListItem job={job} />
          </Link>
        ))}
      </div>

      {totalCount > pageSize && (
        <Pagination>
          <PaginationContent>
            {/* Previous button */}
            {page > 1 && (
              <PaginationItem>
                <Link href={createPageUrl(page - 1)} passHref legacyBehavior>
                  <PaginationPrevious />
                </Link>
              </PaginationItem>
            )}

            {/* First page */}
            {page > 2 && (
              <PaginationItem>
                <Link href={createPageUrl(1)} passHref legacyBehavior>
                  <PaginationLink>1</PaginationLink>
                </Link>
              </PaginationItem>
            )}

            {/* Ellipsis after first page */}
            {page > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Current page */}
            <PaginationItem>
              <PaginationLink isActive>{page}</PaginationLink>
            </PaginationItem>

            {/* Next page */}
            {hasNextPage && (
              <>
                <PaginationItem>
                  <Link href={createPageUrl(page + 1)} passHref legacyBehavior>
                    <PaginationLink>{page + 1}</PaginationLink>
                  </Link>
                </PaginationItem>

                {/* Ellipsis before next page */}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>

                {/* Next button */}
                <PaginationItem>
                  <Link href={createPageUrl(page + 1)} passHref legacyBehavior>
                    <PaginationNext />
                  </Link>
                </PaginationItem>
              </>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
