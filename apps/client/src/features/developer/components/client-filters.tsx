'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import type { DeveloperFilters as FilterType } from '../types/developer';
import { DeveloperFilters } from './developer-filters';

export function ClientFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterType>({});

  const handleFiltersChange = (newFilters: FilterType) => {
    setFilters(newFilters);
    const params = new URLSearchParams(searchParams);

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });

    router.push(`/developers?${params.toString()}`);
  };

  return (
    <DeveloperFilters
      filters={filters}
      onFiltersChange={handleFiltersChange}
      specializations={[]}
    />
  );
}
