export type Modality = 'Remote' | 'OnSite' | 'Hybrid' | 'all';
export type Schedule = 'FullTime' | 'PartTime' | 'all';
export type JobStatus = 'Open' | 'In Progress' | 'For Review' | 'Done';

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
  experienceLevel: 'Junior' | 'Mid' | 'Senior';
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
  modality: Modality | '';
  schedule: Schedule | '';
  minSalary: number | '';
}

export type Specialization = 'Frontend' | 'Backend' | 'DevOps' | 'Architect';

export interface Skill {
  id: string;
  name: string;
}

export interface Language {
  id: string;
  name: string;
}

export interface JobAttachment {
  id: string;
  url: string;
  jobId: string;
}

export interface JobFormData {
  title: string;
  specialization: Specialization;
  salaryPerHour: number;
  schedule: Schedule;
  modality: Modality;
  location: string;

  description: string;
  requirements: string[];
  benefits: string[];

  skills: string[];
  languages: string[];

  attachments?: File[];
}
