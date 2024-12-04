import { apiRequest } from '@/lib/api';
import { CreateUserDTO, User } from '../types/user';

export class UserService {
  private static readonly BASE_PATH = '/users-jobs/users';

  static async createUser(data: CreateUserDTO): Promise<void> {
    console.log('Creating user with data:', data);
    const response = await apiRequest<void>({
      endpoint: this.BASE_PATH,
      method: 'POST',
      body: data,
    });
    console.log('Create user response:', response);
    return response;
  }

  static async getUserByIdentityId(identityId: string, token: string): Promise<User> {
    console.log('Fetching user with identityId:', identityId);
    const response = await apiRequest<User>({
      endpoint: `${this.BASE_PATH}/${identityId}`,
      method: 'GET',
      token,
    });
    console.log('Get user response:', response);
    return response;
  }
}
