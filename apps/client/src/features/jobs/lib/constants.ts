export type Modality = 'Remote' | 'On Site' | 'Hybrid' | 'all';
export type Schedule = 'Full Time' | 'Part Time' | 'all';

export interface Job extends BaseEntity {
  title: string;
  salaryPerHour: number;
  location: string;
  description: string;
  modality: Modality;
  schedule: Schedule;
  recruiterId: string;
  recruiterLogo: string;
  skills: string[];
  status: string;
}

export interface JobFilters {
  search: string;
  modality: Modality | '';
  schedule: Schedule | '';
  minSalary: number | '';
}

export interface JobFormData {
  title: string;
  salaryPerHour: number;
  schedule: Schedule;
  modality: Modality;
  location: string;
  description: string;
  skills: string[];
  languages: string[];
  specializationId: string;
}

export type ApplicationStatus = 'Published' | 'Viewed' | 'Accepted' | 'Rejected';
