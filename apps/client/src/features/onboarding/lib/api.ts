import { apiRequest } from '@/lib/api';
import { CreateCompanyData, CreateDeveloperData } from './types';

export class DeveloperService {
  private static readonly BASE_PATH = '/users-jobs/developers';

  static async createDeveloper(data: CreateDeveloperData, token: string): Promise<void> {
    return apiRequest<void>({
      endpoint: this.BASE_PATH,
      method: 'POST',
      body: data,
      token,
    });
  }
}

export class CompanyService {
  private static readonly BASE_PATH = '/users-jobs/recruiters';

  static async createCompany(data: CreateCompanyData, token: string): Promise<void> {
    return apiRequest<void>({
      endpoint: this.BASE_PATH,
      method: 'POST',
      body: data,
      token,
    });
  }
}
