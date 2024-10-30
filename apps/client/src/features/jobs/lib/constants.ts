export const constants = [
  "Full-time",
  "Part-time",
  "Contract",
  "Temporary",
  "Internship",
  "Volunteer",
];

export const locationTypes = ["Remote", "On-site", "Hybrid"];


export interface Job {
  slug: string;
  title: string;
  type: string;
  locationType: string;
  location?: string;
  description?: string;
  salary: number;
  companyName: string;
  applicationEmail?: string;
  applicationUrl?: string;
  companyLogoUrl?: string;
  createdAt: string;
  approved: boolean;
}

export const roles = ["Applicant", "Recruiter"];

export const modalities = ["Remote", "OnSite", "Hybrid"] as const;
export const schedules = ["FullTime", "PartTime"] as const;

export interface JobCommand {
  title: string;
  description: string;
  salaryPerHour: number;
  dueDate: string;
  modality: string;
  schedule: string;
  location: string;
  recruiterId: string;
}