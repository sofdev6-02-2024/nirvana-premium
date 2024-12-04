export interface Recruiter extends BaseEntity {
  name: string;
  location: string;
  profilePictureUrl: string;
  isVerified: boolean;
  userId: string;
  description: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
