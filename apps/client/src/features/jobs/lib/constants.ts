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
  id: number;
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