import { apiRequest } from '@/lib/api';
import { ApplicationsResponse, ApplicationStats, PaginationParams } from '@/types';

export async function getDeveloperApplications(
  developerId: string,
  params: PaginationParams,
): Promise<ApplicationsResponse> {
  return apiRequest({
    endpoint: `/users-jobs/developers/${developerId}/applications`,
    method: 'GET',
    params: params,
  });
}

export async function getApplicationStats(developerId: string): Promise<ApplicationStats> {
  return apiRequest({
    endpoint: `/users-jobs/developers/${developerId}/applications/stats`,
    method: 'GET',
  });
}

export async function updateUserProfile(userId: string, description: string): Promise<void> {
  return apiRequest({
    endpoint: `/users-jobs/users/${userId}/profile`,
    method: 'PUT',
    body: { description },
  });
}
