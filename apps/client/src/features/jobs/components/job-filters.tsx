'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Modality, Schedule } from '../lib/constants';

export interface JobFilters {
  search: string;
  modality: 'Remote' | 'On Site' | 'Hybrid' | 'all';
  schedule: 'Full Time' | 'Part Time' | 'all';
  minSalary: string;
}

export function JobFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<JobFilters>({
    search: searchParams.get('search') || '',
    modality: (searchParams.get('modality') as Modality) || 'all',
    schedule: (searchParams.get('schedule') as Schedule) || 'all',
    minSalary: searchParams.get('minSalary') || '',
  });

  const updateURL = (newFilters: JobFilters) => {
    const params = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.set(key, value);
      }
    });

    params.delete('page');

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleChange = (key: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: JobFilters = {
      search: '',
      modality: 'all',
      schedule: 'all',
      minSalary: '',
    };
    setFilters(defaultFilters);
    router.push(pathname);
  };

  const hasActiveFilters =
    filters.search !== '' ||
    filters.modality !== 'all' ||
    filters.schedule !== 'all' ||
    filters.minSalary !== '';

  return (
    <div className="mb-6">
      <div className="grid gap-4 rounded-lg border p-4 md:grid-cols-2 lg:grid-cols-4">
        <Input
          placeholder="Search jobs..."
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
        />

        <Select value={filters.modality} onValueChange={(value) => handleChange('modality', value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Modalities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modalities</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
            <SelectItem value="On Site">On Site</SelectItem>
            <SelectItem value="Hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.schedule} onValueChange={(value) => handleChange('schedule', value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Schedules" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Schedules</SelectItem>
            <SelectItem value="Full Time">Full Time</SelectItem>
            <SelectItem value="Part Time">Part Time</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Min salary per hour"
          value={filters.minSalary}
          onChange={(e) => handleChange('minSalary', e.target.value)}
          min="0"
        />
      </div>

      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
