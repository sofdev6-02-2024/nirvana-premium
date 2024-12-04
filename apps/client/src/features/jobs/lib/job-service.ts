import { ApplicationStatus, Job } from '@/features/jobs/lib/constants';
import { apiRequest } from '@/lib/api';
import { notFound } from 'next/navigation';
import { JobFormValues } from './validation';

interface JobsResponse {
  items: Job[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface FilterParams {
  search?: string;
  modality?: string;
  schedule?: string;
  minSalary?: string;
  page?: string;
  pageSize?: string;
}

export interface CreateJobRequest {
  title: string;
  salaryPerHour: number;
  schedule: 'FullTime' | 'PartTime';
  modality: 'Remote' | 'OnSite' | 'Hybrid';
  location: string | null;
  description: string;
  skills: string[];
  languages: string[];
  recruiterId: string;
  specializationId: string;
}

function normalizeModality(modality: string): string {
  switch (modality.toLowerCase()) {
    case 'onsite':
    case 'on-site':
    case 'on site':
    case 'OnSite':
      return 'On Site';
    case 'remote':
      return 'Remote';
    case 'hybrid':
      return 'Hybrid';
    default:
      return modality;
  }
}

function normalizeSchedule(schedule: string): string {
  switch (schedule.toLowerCase()) {
    case 'fulltime':
    case 'full-time':
    case 'full time':
    case 'FullTime':
      return 'Full Time';
    case 'parttime':
    case 'part-time':
    case 'part time':
    case 'PartTime':
      return 'Part Time';
    default:
      return schedule;
  }
}

function filterJobs(jobs: Job[], filters: FilterParams): Job[] {
  return jobs.filter((job) => {
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesTitle = job.title.toLowerCase().includes(searchTerm);
      const matchesDescription = job.description.toLowerCase().includes(searchTerm);
      if (!matchesTitle && !matchesDescription) {
        return false;
      }
    }

    if (filters.modality && filters.modality !== 'all') {
      const normalizedFilterModality = normalizeModality(filters.modality);
      const normalizedJobModality = normalizeModality(job.modality);
      if (normalizedFilterModality !== normalizedJobModality) {
        return false;
      }
    }

    if (filters.schedule && filters.schedule !== 'all') {
      const normalizedFilterSchedule = normalizeSchedule(filters.schedule);
      const normalizedJobSchedule = normalizeSchedule(job.schedule);
      if (normalizedFilterSchedule !== normalizedJobSchedule) {
        return false;
      }
    }

    if (filters.minSalary && filters.minSalary !== '') {
      const minSalary = parseFloat(filters.minSalary);
      if (!isNaN(minSalary) && job.salaryPerHour < minSalary) {
        return false;
      }
    }

    return true;
  });
}

export async function readJobs(
  searchParams: FilterParams = {},
  page: number = 1,
  pageSize: number = 10,
): Promise<{
  jobs: Job[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
  totalCount: number;
}> {
  try {
    const response = await apiRequest<JobsResponse>({
      endpoint: '/users-jobs/jobs',
      method: 'GET',
    });

    const filteredJobs = filterJobs(response.items, searchParams);

    const totalCount = filteredJobs.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      jobs: paginatedJobs,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      page,
      totalCount,
    };
  } catch (error) {
    console.error('❌ Error fetching jobs:', error);
    return {
      jobs: [],
      hasNextPage: false,
      hasPreviousPage: false,
      page: 1,
      totalCount: 0,
    };
  }
}

export async function getJobById(id: string): Promise<Job> {
  try {
    const job = await apiRequest<Job>({
      endpoint: `/users-jobs/jobs/${id}`,
      method: 'GET',
      revalidate: 3600,
    });

    if (!job) {
      throw new Error('Job not found');
    }

    return job;
  } catch (error) {
    console.error(`❌ Error fetching job ${id}:`, error);
    notFound();
  }
}

export class JobService {
  private static BASE_PATH = '/users-jobs/jobs';

  static async createJob(data: CreateJobRequest, token: string) {
    return apiRequest<JobFormValues>({
      endpoint: this.BASE_PATH,
      method: 'POST',
      token,
      body: data,
    });
  }

  static async applyToJob(jobId: string, developerId: string, token: string) {
    return apiRequest<void>({
      endpoint: `/users-jobs/jobs/apply/${jobId}`,
      method: 'POST',
      token,
      body: { developerId },
    });
  }

  static async checkApplicationStatus(jobId: string, developerId: string, token: string) {
    return apiRequest<{ apply: boolean }>({
      endpoint: `${this.BASE_PATH}/${jobId}/developer/${developerId}`,
      method: 'GET',
      token,
    });
  }

  static async updateApplicationStatus(
    jobId: string,
    developerId: string,
    status: ApplicationStatus,
    token: string,
  ) {
    return apiRequest<void>({
      endpoint: `/users-jobs/jobs/status/${jobId}`,
      method: 'PATCH',
      token,
      body: {
        developerId,
        status,
      },
    });
  }
}
