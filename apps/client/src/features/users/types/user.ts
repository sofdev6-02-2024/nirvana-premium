import { Roles } from '@/types/globals';

export interface CreateUserDTO {
  identityId: string;
  role: Roles;
  email: string;
}
