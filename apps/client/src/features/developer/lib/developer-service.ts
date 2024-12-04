import { apiRequest } from '@/lib/api';
import { Developer, PaginatedResponse } from '../types/developer';

export async function getDevelopers(
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<Developer>> {
  return apiRequest<PaginatedResponse<Developer>>({
    endpoint: '/users-jobs/developers/',
    method: 'GET',
    params: {
      page,
      pageSize,
    },
    revalidate: 60,
  });
}

export async function getDeveloperById(id: string): Promise<Developer> {
  return apiRequest<Developer>({
    endpoint: `/users-jobs/developers/${id}`,
    method: 'GET',
    revalidate: 60,
  });
}
