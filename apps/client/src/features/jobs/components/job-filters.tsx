"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

export interface JobFilters {
  search: string;
  modality: string;
  schedule: string;
  minSalary: string;
}

export function JobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<JobFilters>({
    search: searchParams.get("search") || "",
    modality: searchParams.get("modality") || "",
    schedule: searchParams.get("schedule") || "",
    minSalary: searchParams.get("minSalary") || "",
  });

  const handleChange = (key: keyof JobFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <div className="mb-6 grid gap-4 rounded-lg border p-4 sm:grid-cols-2 lg:grid-cols-4">
      <Input
        placeholder="Search jobs..."
        value={filters.search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("search", e.target.value)
        }
      />
      <Select
        className="rounded-md border p-2"
        value={filters.modality}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          handleChange("modality", e.target.value)
        }
      >
        <option value="">All Modalities</option>
        <option value="Remote">Remote</option>
        <option value="OnSite">On-Site</option>
        <option value="Hybrid">Hybrid</option>
      </Select>
      <Select
        className="rounded-md border p-2"
        value={filters.schedule}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          handleChange("schedule", e.target.value)
        }
      >
        <option value="">All Schedules</option>
        <option value="Full Time">Full Time</option>
        <option value="Part Time">Part Time</option>
      </Select>
      <Input
        type="number"
        placeholder="Min salary per hour"
        value={filters.minSalary}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("minSalary", e.target.value)
        }
      />
    </div>
  );
}
