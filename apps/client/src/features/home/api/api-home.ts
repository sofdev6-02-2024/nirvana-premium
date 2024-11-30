import { apiRequest } from '@/lib/api';
import { ApplicationsResponse, ApplicationStats } from '../types/home';

export class ApplicationService {
  private static BASE_PATH = '/users-jobs/developers';
  static async getApplications(
    developerId: string,
    token: string,
    params?: {
      status?: 'Published' | 'Viewed' | 'Accepted' | 'Rejected';
      page?: number;
      pageSize?: number;
    },
  ) {
    return apiRequest<ApplicationsResponse>({
      endpoint: `${this.BASE_PATH}/${developerId}/applications`,
      method: 'GET',
      token,
      params,
    });
  }

  static async getStats(developerId: string, token: string) {
    return apiRequest<ApplicationStats>({
      endpoint: `${this.BASE_PATH}/${developerId}/applications/stats`,
      method: 'GET',
      token,
    });
  }
}
