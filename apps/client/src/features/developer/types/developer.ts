export interface Developer {
  id: string;
  name: string;
  lastName: string;
  yearsOfExperience: number;
  salaryPerHourExpected: number;
  location: string;
  portfolioUrl: string;
  profilePictureUrl: string;
  description: string;
  specialization: {
    id: string;
    name: string;
  };
  skills: Array<{
    id: string;
    name: string;
  }>;
  spokenLanguages: Array<{
    id: string;
    name: string;
  }>;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface DeveloperFilters {
  specialization?: string;
  minExperience?: number;
  maxSalary?: number;
  skills?: string[];
  languages?: string[];
  location?: string;
}
