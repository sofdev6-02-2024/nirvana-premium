"use client";

import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface JobPaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalCount: number;
  pageSize: number;
}

export function JobPagination({
  currentPage,
  hasNextPage,
  hasPreviousPage,
  totalCount,
  pageSize,
}: JobPaginationProps) {
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalCount / pageSize);

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    // Preserve all existing filters
    searchParams.forEach((value, key) => {
      if (key !== "page") {
        params.set(key, value);
      }
    });

    // Set the new page
    params.set("page", page.toString());
    return `/jobs?${params.toString()}`;
  };

  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;

  return (
    <Pagination className="mt-4 flex justify-center">
      {" "}
      {/* Center and add spacing */}
      <PaginationContent>
        {hasPreviousPage && (
          <PaginationItem>
            <PaginationPrevious href={createPageUrl(currentPage - 1)} />
          </PaginationItem>
        )}

        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink href={createPageUrl(1)}>1</PaginationLink>
          </PaginationItem>
        )}

        {currentPage > 3 && <PaginationEllipsis />}

        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink href={createPageUrl(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>

        {hasNextPage && (
          <PaginationItem>
            <PaginationLink href={createPageUrl(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentPage < totalPages - 2 && <PaginationEllipsis />}

        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationLink href={createPageUrl(totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {hasNextPage && (
          <PaginationItem>
            <PaginationNext href={createPageUrl(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
