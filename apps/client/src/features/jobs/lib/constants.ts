export interface Job {
  id: string;
  title: string;
  dueDate: string;
  salaryPerHour: number;
  location: string;
  description: string;
  modality: "Remote" | "OnSite" | "Hybrid";
  schedule: "FullTime" | "PartTime";
  createdAt: string;
  isActive: boolean;
  recruiterId: string;
  status: "Open" | "InProgress" | "ForReview" | "Done";
}

export const modalities = ["Remote", "OnSite", "Hybrid"] as const;
export const schedules = ["Full-Time", "Part-Time"] as const;
export const status = ["Open", "In Progress", "For Review", "Done"];
