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

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  createPageUrl: (page: number) => string;
  hasNextPage: boolean;
}

export function PaginationControls({
  page,
  totalPages,
  createPageUrl,
  hasNextPage,
}: PaginationControlsProps) {
  return (
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

        {page > 1 && (
          <PaginationItem>
            <Link href={createPageUrl(page - 1)} passHref legacyBehavior>
              <PaginationLink>{page - 1}</PaginationLink>
            </Link>
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
            {page < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {page < totalPages - 1 && (
              <PaginationItem>
                <Link href={createPageUrl(totalPages)} passHref legacyBehavior>
                  <PaginationLink>{totalPages}</PaginationLink>
                </Link>
              </PaginationItem>
            )}
            <PaginationItem>
              <Link href={createPageUrl(page + 1)} passHref legacyBehavior>
                <PaginationNext />
              </Link>
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
