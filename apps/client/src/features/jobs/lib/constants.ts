// features/jobs/lib/constants.ts
export interface Job {
  id: string;
  title: string;
  salaryPerHour: number;
  location: string;
  description: string;
  modality: "Remote" | "OnSite" | "Hybrid";
  schedule: "Part Time" | "Full Time";
  status: "Open" | "InProgress" | "ForReview" | "Done";
  recruiterId: string;
  recruiterLogo: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const modalities = ["Remote", "OnSite", "Hybrid"] as const;
export const schedules = ["Full-Time", "Part-Time"] as const;
export const status = ["Open", "In Progress", "For Review", "Done"];
