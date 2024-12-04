'use client';

import LoadingScreen from '@/components/loading/loading-screen';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useFormDataStore } from '@/stores/use-form-data-store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Developer, PaginatedResponse } from '../types/developer';
import { DeveloperCard } from './developer-card';
import { DeveloperFilters } from './developer-filters';
import { PaginationControls } from './pagnation-controls';

interface DeveloperListProps {
  initialData: PaginatedResponse<Developer>;
  searchParams: { [key: string]: string | undefined };
}

export default function DeveloperList({ initialData, searchParams }: DeveloperListProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [filteredDevelopers, setFilteredDevelopers] = useState(initialData.items);
  const { skills, specializations, languages, isLoading, error, loadFormData } = useFormDataStore();

  useEffect(() => {
    loadFormData();
  }, [loadFormData]);

  useEffect(() => {
    const filtered = initialData.items.filter((developer) => {
      if (
        searchParams.specialization &&
        developer.specialization.id !== searchParams.specialization
      ) {
        return false;
      }
      if (
        searchParams.minExperience &&
        developer.yearsOfExperience < parseInt(searchParams.minExperience)
      ) {
        return false;
      }
      if (
        searchParams.maxExperience &&
        developer.yearsOfExperience > parseInt(searchParams.maxExperience)
      ) {
        return false;
      }
      if (
        searchParams.minRate &&
        developer.salaryPerHourExpected < parseInt(searchParams.minRate)
      ) {
        return false;
      }
      if (
        searchParams.maxRate &&
        developer.salaryPerHourExpected > parseInt(searchParams.maxRate)
      ) {
        return false;
      }
      if (
        searchParams.skill &&
        !developer.skills.some((skill) => skill.id === searchParams.skill)
      ) {
        return false;
      }
      if (
        searchParams.location &&
        !developer.location.toLowerCase().includes(searchParams.location.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

    setFilteredDevelopers(filtered);
  }, [searchParams, initialData.items]);

  const handleFilterChange = (key: string, value: string | undefined) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([paramKey, paramValue]) => {
      if (paramKey !== 'page' && paramKey !== key && paramValue) {
        params.set(paramKey, paramValue);
      }
    });
    if (value) {
      params.set(key, value);
    }
    router.push(`/developers?${params.toString()}`);
  };
  const createPageUrl = (pageNum: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== 'page' && value) {
        params.set(key, value);
      }
    });
    params.set('page', pageNum.toString());
    return `/developers?${params.toString()}`;
  };
  const totalPages = Math.ceil(initialData.totalCount / initialData.pageSize);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    toast({
      title: 'Error loading Filtering Options',
      description: ':ccc',
    });
  }

  if (filteredDevelopers.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <h3 className="mt-4 text-lg font-semibold">No developers found</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            Try adjusting your filters or check back later.
          </p>
          <Button variant="outline" asChild>
            <Link href="/developers">Clear filters</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside className="lg:col-span-1">
        <DeveloperFilters
          searchParams={searchParams}
          onFilterChange={handleFilterChange}
          skills={skills}
          specializations={specializations}
          languages={languages}
        />
      </aside>

      <main className="lg:col-span-3 space-y-8">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{filteredDevelopers.length}</span> of{' '}
          <span className="font-medium">{initialData.totalCount}</span> developers
        </p>

        <div className="grid grid-cols-1 gap-6">
          {filteredDevelopers.map((developer) => (
            <DeveloperCard key={developer.id} developer={developer} />
          ))}
        </div>

        {totalPages > 1 && (
          <PaginationControls
            page={initialData.page}
            totalPages={totalPages}
            createPageUrl={createPageUrl}
            hasNextPage={initialData.hasNextPage}
          />
        )}
      </main>
    </div>
  );
}
