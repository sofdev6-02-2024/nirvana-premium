import { Job } from '@/features/jobs/lib/constants';
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
  schedule: 'Full Time' | 'Part Time';
  modality: 'Remote' | 'On Site' | 'Hybrid';
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
    console.log('Fetching jobs with params:', searchParams);

    const response = await apiRequest<JobsResponse>({
      endpoint: '/users-jobs/jobs',
      method: 'GET',
      revalidate: 3600,
    });

    const filteredJobs = filterJobs(response.items, searchParams);

    const totalCount = filteredJobs.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
    const totalPages = Math.ceil(totalCount / pageSize);

    console.log('Filtered jobs count:', filteredJobs.length);
    console.log('Current page:', page);
    console.log('Total pages:', totalPages);

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
    const newToken =
      'eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDIyMkFBQSIsImtpZCI6Imluc18ycEZ2Y3JTS1hvQzgwVVJmcUY2bTVMTFRBcXQiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwczovL3N1YnRsZS1ncmlmZm9uLTk5LmFjY291bnRzLmRldiIsImV4cCI6MjA0Nzc0NTUzMiwiaWF0IjoxNzMyMzg1NTMyLCJpc3MiOiJodHRwczovL3N1YnRsZS1ncmlmZm9uLTk5LmNsZXJrLmFjY291bnRzLmRldiIsImp0aSI6IjVmMjZmN2Q4ZjNmY2Q3NzE5MjZjIiwibWV0YWRhdGEiOnsib25ib2FyZGluZ0NvbXBsZXRlIjp0cnVlLCJyb2xlIjoicmVjcnVpdGVyIn0sIm5iZiI6MTczMjM4NTUyNywic3ViIjoidXNlcl8ycEZ3Y2NuOFJzcDZlVmRYTXZvQ1QxbEFSNmoifQ.INYYylklvHJWFKkyZ2sRdZ5R7dVYBC0SSYb4aZ3oyNl73Ux8IqYW02EloyxDGWfkBM3i9ZCtnE8R0uqho0KfijOHp4YMdZFMaLawo4RekxIkGCemy8gTkf_bg_cLmi9hkPg_emvpa3_5JadOOu0Hx9ZQgqn5AwEnOxRUyS_rNJwvErFKT29XlxLX_j3zYFn0O9BxtS1HmguF2F_w_3f6SyctDwbSJHBNayyZqzXzlPQVwFucBBTbXuXc1BqIUir7x1xiM4qv4uS0GQATnTQ_92WdVXb_0wM4s3M3hB4zWiwJ-zmfdBde3uTE5oV3YDsdjmMEZxA2iLkiO0saHqQtVg';
    return apiRequest<JobFormValues>({
      endpoint: this.BASE_PATH,
      method: 'POST',
      token: newToken,
      body: data,
    });
  }

  static async applyToJob(jobId: string, developerId: string, token: string) {
    const newToken =
      'eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDIyMkFBQSIsImtpZCI6Imluc18ycEZ2Y3JTS1hvQzgwVVJmcUY2bTVMTFRBcXQiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwczovL3N1YnRsZS1ncmlmZm9uLTk5LmFjY291bnRzLmRldiIsImV4cCI6MjA0Nzc0NTY1MCwiaWF0IjoxNzMyMzg1NjUwLCJpc3MiOiJodHRwczovL3N1YnRsZS1ncmlmZm9uLTk5LmNsZXJrLmFjY291bnRzLmRldiIsImp0aSI6ImU4MTJiNmM4MDY0ZjQwNDdiYzcyIiwibWV0YWRhdGEiOnsib25ib2FyZGluZ0NvbXBsZXRlIjp0cnVlLCJyb2xlIjoiZGV2ZWxvcGVyIn0sIm5iZiI6MTczMjM4NTY0NSwic3ViIjoidXNlcl8ycEZ3NnlVZzR5RHNiRG5pNzRsNWdqVTdYalYifQ.WEUTnLgYbwEt40M8XVqENUsKjkSjvwurNEtQKwR5fAGh4Zpowk3HLKCxaTso4cHxYxnWxoIdUNnrJL3U8C9FgirEMICtbVcBD3hVkHkRpO9QbGm8Qvx6y-pJZOsXekSpFxwV3fnYT0qf3obU9yHxGp1MotbUkEN8myWFRdUBP7u2maa_zx51sAxSCEHUgzz1FkAB9qaIzLuBBSKfEwHjySl1zmhq3d2p3cEmCntbZRQLyIGi1Do-cCyJZQHCeXKf41PViGqkWW_dSO5ZTQOt3sWLInPYQoeLYqQTd_LGxTbGfqsy8AxgL6PSmqXgvT02iaKkV01GLBhwlj1VNqEn-w';
    return apiRequest<void>({
      endpoint: `/users-jobs/jobs/apply/${jobId}`,
      method: 'POST',
      token: newToken,
      body: { developerId },
    });
  }
}
