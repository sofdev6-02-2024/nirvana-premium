"use client";
import { useState, useMemo } from "react";
import { Job } from "@/features/jobs/lib/constants";
import Link from "next/link";
import JobListItem from "./job-list-item";

interface JobSorterProps {
  jobs: Job[];
}

export default function JobSorter({ jobs }: JobSorterProps) {
  const [sortCriteria, setSortCriteria] = useState("recent");

  const sortedJobs = useMemo(() => {
    const jobsCopy = [...jobs];
    switch (sortCriteria) {
      case "salary-high":
        return jobsCopy.sort(
          (a, b) => (b.salaryPerHour || 0) - (a.salaryPerHour || 0),
        );
      case "salary-low":
        return jobsCopy.sort(
          (a, b) => (a.salaryPerHour || 0) - (b.salaryPerHour || 0),
        );
      case "recent":
      default:
        return jobsCopy.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    }
  }, [sortCriteria, jobs]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">
            {sortedJobs.length}
          </span>{" "}
          jobs
        </p>
        <div className="flex items-center space-x-2">
          <p className="text-xs text-muted-foreground">Sort by:</p>
          <select
            className="h-8 w-[140px] rounded-md border border-input bg-transparent px-3 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
          >
            <option value="recent">Most Recent</option>
            <option value="salary-high">Highest Salary</option>
            <option value="salary-low">Lowest Salary</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {sortedJobs.map((job) => (
          <Link key={job.id} href={`/jobs/${job.id}`} className="block">
            <JobListItem job={job} />
          </Link>
        ))}
      </div>
    </div>
  );
}
