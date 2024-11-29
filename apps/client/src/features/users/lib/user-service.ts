import { apiRequest } from '@/lib/api';
import { CreateUserDTO } from '../types/user';

export class UserService {
  private static readonly BASE_PATH = '/users-jobs/users';

  static async createUser(data: CreateUserDTO): Promise<void> {
    return apiRequest<void>({
      endpoint: this.BASE_PATH,
      method: 'POST',
      body: data,
    });
  }
}
