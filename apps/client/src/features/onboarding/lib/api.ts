import { apiRequest } from '@/lib/api';
import { CreateDeveloperData } from './types';

export async function createDeveloper(data: CreateDeveloperData) {
  return apiRequest({
    endpoint: '/users-jobs/developers',
    method: 'POST',
    body: data,
  });
}
