"use client";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Modality, Schedule } from "@/features/jobs/lib/constants";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useDebounce } from "../hooks/use-dobounse";

export interface JobFilters {
  search: string;
  modality: Modality | "all";
  schedule: Schedule | "all";
  minSalary: string;
}

const initialFilters: JobFilters = {
  search: "",
  modality: "all",
  schedule: "all",
  minSalary: "",
};

export function JobFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<JobFilters>({
    search: searchParams.get("search") || "",
    modality: (searchParams.get("modality") as Modality) || "all",
    schedule: (searchParams.get("schedule") as Schedule) || "all",
    minSalary: searchParams.get("minSalary") || "",
  });

  const debouncedSearch = useDebounce(filters.search, 300);

  const updateURL = useCallback(
    (newFilters: JobFilters) => {
      const params = new URLSearchParams();

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value && value !== "all") {
          params.set(key, value.toString());
        }
      });

      router.push(
        `${pathname}${params.toString() ? `?${params.toString()}` : ""}`,
      );
    },
    [pathname, router],
  );

  const handleChange = (key: keyof JobFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    if (key !== "search") {
      updateURL(newFilters);
    }
  };

  const handleReset = () => {
    setFilters(initialFilters);
    router.push(pathname);
  };

  useEffect(() => {
    const newFilters = { ...filters, search: debouncedSearch };
    updateURL(newFilters);
  }, [debouncedSearch, filters, updateURL]);

  const hasActiveFilters =
    filters.search !== "" ||
    filters.modality !== "all" ||
    filters.schedule !== "all" ||
    filters.minSalary !== "";

  return (
    <div className="space-y-4">
      <div className="mb-6 grid gap-4 rounded-lg border p-4 sm:grid-cols-2 lg:grid-cols-4">
        <Input
          placeholder="Search jobs..."
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          className="w-full"
        />

        <Select
          value={filters.modality}
          onValueChange={(value) => handleChange("modality", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Modalities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modalities</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
            <SelectItem value="OnSite">On-Site</SelectItem>
            <SelectItem value="Hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.schedule}
          onValueChange={(value) => handleChange("schedule", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Schedules" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Schedules</SelectItem>
            <SelectItem value="FullTime">Full Time</SelectItem>
            <SelectItem value="PartTime">Part Time</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Min salary per hour"
          value={filters.minSalary}
          onChange={(e) => handleChange("minSalary", e.target.value)}
          className="w-full"
          min="0"
        />
      </div>

      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
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
