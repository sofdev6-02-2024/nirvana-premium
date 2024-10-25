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