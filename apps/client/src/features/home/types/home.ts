export interface Application {
  id: string;
  status: 'Published' | 'Viewed' | 'Accepted' | 'Rejected';
  jobId: string;
  jobTitle: string;
  recruiterId: string;
  recruiterName: string;
  recruiterProfileUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationsResponse {
  items: Application[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApplicationStats {
  total: number;
  pending: number;
  accepted: number;
  rejected: number;
  viewed: number;
}

export interface UserProfile {
  id: string;
  type: 'developer' | 'recruiter';
  description: string | null;
  selectedLayout: 'professional' | 'creative' | 'minimalist' | 'technical';
  layoutColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface ProfileContent {
  description: string;
}
