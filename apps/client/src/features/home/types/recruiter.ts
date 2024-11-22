export interface RecruiterJob {
  id: string;
  title: string;
  salaryPerHour: number;
  schedule: 'Full Time' | 'Part Time';
  modality: 'Remote' | 'On Site' | 'Hybrid';
  status: 'Open' | 'In Progress' | 'For Review' | 'Done';
  description: string | null;
  location: string | null;
  recruiterId: string;
  recruiterLogo: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplicant {
  developerId: string;
  developerProfileUrl: string | null;
  developerName: string;
  developerLastName: string;
  status: 'Published' | 'Viewed' | 'Accepted' | 'Rejected';
  createdAt: string;
  updatedAt: string;
}

export interface ApplicantsResponse {
  jobId: string;
  jobTitle: string;
  developers: {
    items: JobApplicant[];
    page: number;
    pageSize: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface ApplicantsStats {
  total: number;
  pending: number;
  accepted: number;
  rejected: number;
  viewed: number;
}
