export interface Recruiter {
  name: string;
  location: string;
  description: string;
  profilePictureUrl: string;
  id: string;
  isVerified: boolean;
  createdAt: string;
  userId: string;
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
