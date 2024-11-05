export type Modality = "Remote" | "OnSite" | "Hybrid";
export type Schedule = "PartTime" | "FullTime";
export type JobStatus = "Open" | "InProgress" | "ForReview" | "Done";

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Job extends BaseEntity {
  title: string;
  salaryPerHour: number;
  location: string;
  description: string;
  modality: Modality;
  schedule: Schedule;
  status: JobStatus;
  recruiterId: string;
  recruiterLogo: string;
  skills: string[];
  experienceLevel: "Junior" | "Mid" | "Senior";
  benefits: string[];
}

export interface Recruiter extends BaseEntity {
  name: string;
  location: string;
  description: string;
  profilePictureUrl: string;
  isVerified: boolean;
  companyName: string;
  companySector: string;
  contactEmail: string;
}

export interface JobFilters {
  search: string;
  modality: Modality | "";
  schedule: Schedule | "";
  minSalary: number | "";
}
