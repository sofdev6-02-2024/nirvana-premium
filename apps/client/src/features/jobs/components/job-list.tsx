import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import Link from 'next/link';
import { readJobs } from '../lib/job-service';
import JobListItem from './job-list-item';

interface JobListProps {
  searchParams?: { [key: string]: string | undefined };
}

export default async function JobList({ searchParams = {} }: JobListProps) {
  const page = parseInt(searchParams.page || '1', 10);
  const pageSize = 5;

  const { jobs, hasNextPage, totalCount } = await readJobs(searchParams, page, pageSize);

  if (jobs.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <h3 className="mt-4 text-lg font-semibold">No jobs found</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            We could not find any jobs matching your criteria. Try adjusting your filters or check
            back later.
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

    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== 'page' && value) {
        params.set(key, value);
      }
    });

    params.set('page', pageNum.toString());
    return `/jobs?${params.toString()}`;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{jobs.length}</span> of{' '}
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
            {page > 1 && (
              <PaginationItem>
                <Link href={createPageUrl(page - 1)} passHref legacyBehavior>
                  <PaginationPrevious />
                </Link>
              </PaginationItem>
            )}

            {page > 2 && (
              <PaginationItem>
                <Link href={createPageUrl(1)} passHref legacyBehavior>
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
              <>
                <PaginationItem>
                  <Link href={createPageUrl(page + 1)} passHref legacyBehavior>
                    <PaginationLink>{page + 1}</PaginationLink>
                  </Link>
                </PaginationItem>

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>

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
