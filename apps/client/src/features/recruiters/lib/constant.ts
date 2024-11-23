export interface Recruiter extends BaseEntity {
  name: string;
  location: string;
  description: string;
  profilePictureUrl: string;
  isVerified: boolean;
  userId: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
