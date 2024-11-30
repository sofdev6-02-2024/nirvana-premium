import { Roles } from '@/types/globals';

export interface CreateUserDTO {
  identityId: string;
  role: Roles;
  email: string;
}

export interface User {
  id: string;
  role: Roles;
  email: string;
  doOnboarding: boolean;
  developerId: string | null;
  recruiterId: string | null;
}
