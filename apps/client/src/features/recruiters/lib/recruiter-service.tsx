import { ApplicantsResponse, ApplicantsStats } from '@/features/home/types/recruiter';
import { Job } from '@/features/jobs/lib/constants';
import { apiRequest } from '@/lib/api';
import { PaginatedResponse, Recruiter } from '../lib/constant';

interface GetRecruitersOptions {
  page?: number;
  pageSize?: number;
  search?: string;
  location?: string;
}

const auxToken =
  'eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDIyMkFBQSIsImtpZCI6Imluc18ycEZ2Y3JTS1hvQzgwVVJmcUY2bTVMTFRBcXQiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwczovL3N1YnRsZS1ncmlmZm9uLTk5LmFjY291bnRzLmRldiIsImV4cCI6MjA0Nzc0NTUzMiwiaWF0IjoxNzMyMzg1NTMyLCJpc3MiOiJodHRwczovL3N1YnRsZS1ncmlmZm9uLTk5LmNsZXJrLmFjY291bnRzLmRldiIsImp0aSI6IjVmMjZmN2Q4ZjNmY2Q3NzE5MjZjIiwibWV0YWRhdGEiOnsib25ib2FyZGluZ0NvbXBsZXRlIjp0cnVlLCJyb2xlIjoicmVjcnVpdGVyIn0sIm5iZiI6MTczMjM4NTUyNywic3ViIjoidXNlcl8ycEZ3Y2NuOFJzcDZlVmRYTXZvQ1QxbEFSNmoifQ.INYYylklvHJWFKkyZ2sRdZ5R7dVYBC0SSYb4aZ3oyNl73Ux8IqYW02EloyxDGWfkBM3i9ZCtnE8R0uqho0KfijOHp4YMdZFMaLawo4RekxIkGCemy8gTkf_bg_cLmi9hkPg_emvpa3_5JadOOu0Hx9ZQgqn5AwEnOxRUyS_rNJwvErFKT29XlxLX_j3zYFn0O9BxtS1HmguF2F_w_3f6SyctDwbSJHBNayyZqzXzlPQVwFucBBTbXuXc1BqIUir7x1xiM4qv4uS0GQATnTQ_92WdVXb_0wM4s3M3hB4zWiwJ-zmfdBde3uTE5oV3YDsdjmMEZxA2iLkiO0saHqQtVg';

export async function readCompany(page: number = 1, pageSize: number = 10): Promise<Recruiter[]> {
  try {
    const response = await apiRequest<PaginatedResponse<Recruiter>>({
      endpoint: '/users-jobs/recruiters',
      method: 'GET',
      params: {
        page,
        pageSize,
      },
    });
    return response.items || [];
  } catch (error) {
    console.error('Error fetching recruiters:', error);
    return [];
  }
}

export async function getRecruiterById(id: string): Promise<Recruiter | undefined> {
  try {
    const allRecruiters = await getAllRecruiters();
    return allRecruiters.find((recruiter) => recruiter.id === id);
  } catch (error) {
    console.error(`Error fetching recruiter with id ${id}:`, error);
    return undefined;
  }
}

export async function getAllRecruiters(
  page: number = 1,
  pageSize: number = 100,
): Promise<Recruiter[]> {
  try {
    return await readCompany(page, pageSize);
  } catch (error) {
    console.error('Error in getAllRecruiters:', error);
    return [];
  }
}

export async function searchRecruiters({
  page = 1,
  pageSize = 10,
  search = '',
  location = '',
}: GetRecruitersOptions = {}): Promise<Recruiter[]> {
  try {
    const response = await apiRequest<PaginatedResponse<Recruiter>>({
      endpoint: '/users-jobs/recruiters',
      method: 'GET',
      params: {
        page,
        pageSize,
        ...(search && { search }),
        ...(location && { location }),
      },
    });
    return response.items || [];
  } catch (error) {
    console.error('Error searching recruiters:', error);
    return [];
  }
}

export async function getJobsByRecruiter(
  recruiterId: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<Job[]> {
  try {
    const response = await apiRequest<PaginatedResponse<Job>>({
      endpoint: `/users-jobs/recruiters/${recruiterId}/jobs`,
      method: 'GET',
      params: {
        page,
        pageSize,
      },
    });
    return response.items || [];
  } catch (error) {
    console.error(`Error fetching jobs for recruiter ${recruiterId}:`, error);
    return [];
  }
}

export async function getJobApplicants(
  recruiterId: string,
  jobId: string,
  token: string,
  params?: {
    status?: 'Published' | 'Viewed' | 'Accepted' | 'Rejected';
    page?: number;
    pageSize?: number;
  },
) {
  return apiRequest<ApplicantsResponse>({
    endpoint: `/users-jobs/recruiters/${recruiterId}/applicants/${jobId}`,
    method: 'GET',
    token: auxToken,
    params,
  });
}

export async function getJobStats(recruiterId: string, jobId: string, token: string) {
  return apiRequest<ApplicantsStats>({
    endpoint: `/users-jobs/recruiters/${recruiterId}/applicants/${jobId}/stats`,
    method: 'GET',
    token: auxToken,
  });
}

export async function updateApplicationStatus(
  recruiterId: string,
  jobId: string,
  developerId: string,
  status: 'Published' | 'Viewed' | 'Accepted' | 'Rejected',
  token: string,
) {
  return apiRequest<void>({
    endpoint: `/users-jobs/recruiters/${recruiterId}/applicants/${jobId}/${developerId}/status`,
    method: 'PUT',
    token,
    body: { status },
  });
}
